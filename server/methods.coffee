Meteor.methods
  updateProfile: (doc, modifier, id) ->
    #Important server-side check for security and data integrity
    check(doc, Schema.profile)
    Meteor.users.update(id, {$set: {"profile.roles": doc.roles, summary: doc.summary}})
    #console.log(Meteor.users.findOne(id).profile.roles)

  extractInfoFromUrl: (url)->
    extractBase = 'http://api.embed.ly/1/extract'
    embedlyKey = Meteor.settings.embedly
    try
      result = Meteor.http.get(extractBase, {
        params: {
          key: embedlyKey,
          url: url,
          image_width: 200
        }
      })

      return result
    catch error
      console.log(error)
      return null

  upvoteLink: (linkId)->
    link = Links.findOne(linkId)
    Links.update(link._id, {
      $addToSet: {upvoters: this.userId},
      $inc: {votesCount: 1}
    })

  followUser: (followingId)->
    console.log followingId
    console.log 'call follow user'
    Follows.insert({
      followingId: followingId
      followerId: Meteor.userId()
    })

  toggleEntity: (entityType, entityId, attribute, value)->
    entityClass = Mongo.Collection.get(entityType)
    if Roles.userIsInRole(Meteor.userId(), 'admin')
      if value
        modifier = {$set: {}}
        modifier['$set'][attribute] = value
      else
        modifier = {$unset: {}}
        modifier['$unset'][attribute] = value

      entityClass.update({_id: entityId}, modifier)
    else
      throw new Meteor.Error(403, "Not authorized")

  meetUser: (meetUserId)->
    existMeetship = Meetships.findOne({userId: meetUserId, meetUserId: Meteor.userId()})
    if existMeetship
      Meetships.update(existMeetship._id, { $set: {connected: true}})
      user = Meteor.users.findOne(Meteor.userId())
      meetUser = Meteor.users.findOne(meetUserId)
      now = new Date()
      groupId = PrivateGroups.insert({
        members: [
          {
            id: user._id
            userName: getUserName(user)
            picture: getUserPicture(user)
          },
          {
            id: meetUser._id
            userName: getUserName(meetUser)
            picture: getUserPicture(meetUser)
          }
        ],
        updatedAt: now
      })
      createPrivateGroupNotification(groupId, user._id, meetUser._id)
      createPrivateGroupNotification(groupId, meetUser._id, user._id)
    else
      Meetships.insert({
        userId: Meteor.userId(),
        meetUserId: meetUserId,
        connected: false
      })

  kickUserFromGroup: (opts={})->
    Groups.update(opts.group._id, { $pull: { 'members': { id: opts.user._id }}})

  markNoticationRead: (notificationId)->
    Notifications.update({_id: notificationId}, { $set: { read: true }})

  addQuestion: (opts={})->
    questionId = Questions.insert({
      content: opts.content,
      authorId: Meteor.userId(),
      authorName: getUserName(Meteor.user()),
      createdAt: (new Date()),
      commentsCount: 0,
      answersCount: 0
    })
    question = Questions.findOne(questionId)
    _.each opts.tags, (tag)->
      Questions.addTag(tag, { _id: question._id })

  upvoteQuestion: (questionId)->
    question = Questions.findOne(questionId)
    Questions.update(question._id, {
      $addToSet: {upvoters: this.userId},
      $inc: {votesCount: 1}
    })

  addAnswerComment: (opts={})->
    QaComments.insert({
      content: opts.content
      questionId: opts.answer.questionId
      answerId: opts.answer._id
      authorId: Meteor.userId()
      authorName: getUserName(Meteor.user()),
      createdAt: (new Date())
    })
    Answers.update(opts.answer._id, { $inc: { commentsCount: 1 } })

  createEventGroup: (eventId)->
    if Roles.userIsInRole(Meteor.userId(), 'admin')
      event = Events.findOne(eventId)
#      console.log event
      unless event.groupId
        name = event.title
        time = moment(event.startDate).format('MMM Do ddd')
        address = ""
        if event.venue
          address = "#{event.venue.city}, #{event.venue.region}"
        if event.event_source == 'meetup'
          name = event.name
          if event.venue
            address = "#{event.venue.city}, #{event.venue.state}"
        console.log(name)
        console.log(address)
        groupId = Groups.insert({
          name: name
          desc: "#{time} at #{address}."
          count: 0
          members: []
          eventId: eventId
        })
        Events.update({_id: eventId}, {$set: {groupId: groupId}})

  refreshProfile: ()->
    user = Meteor.users.findOne(Meteor.userId())
    linkedin = user.services.linkedin
    if user && linkedin
      accessToken = linkedin.accessToken
      expiredDate = new Date(linkedin.expiresAt)
      if (new Date()) < expiredDate
        extraFields = 'first-name,headline,id,last-name,site-standard-profile-request,email-address,location:(name),num-connections,picture-url,public-profile-url,skills,languages,three-current-positions,three-past-positions,educations,recommendations-received,summary';
        url = 'https://api.linkedin.com/v1/people/~:(' + extraFields + ')'
        response = Meteor.http.get(url, {
            params: {
                oauth2_access_token: accessToken,
                format: 'json'
            }
        }).data
        
        delete response['summary']
        newProfile = _.extend(user.profile, response)
        Meteor.users.update(Meteor.userId(), { $set: { profile: newProfile }})

  increaseLogin: ()->
    user = Meteor.users.findOne(Meteor.userId())
    Meteor.users.update(user._id, { $inc: { loginCount: 1} })
    (user.loginCount || 1)

  sendPrivateMessage: (opts={})->
    groupId = opts.groupId
    content = opts.content
    userName = Meteor.user().profile.firstName
    avatar = Meteor.user().profile.pictureUrl

    group = PrivateGroups.findOne(groupId)
    now = new Date()
    PrivateGroups.update(group._id, { $set: { updatedAt: now } })
    PrivateMessages.insert
      privateGroupId: groupId
      name: userName
      message: content
      created: now
      avatar: avatar

  sendGroupMessage: (opts={})->
    groupId = opts.groupId
    content = opts.content
    userName = Meteor.user().profile.firstName
    avatar = Meteor.user().profile.pictureUrl

    Groups.update(groupId, { $set: { updatedAt: (new Date()) } })
    Messages.insert
      groupId: groupId
      name: userName
      userId: Meteor.userId()
      message: content
      created: new Date()
      avatar: avatar

  maskNotificationsAsRead: ()->
    Notifications.update({userId: Meteor.userId(), read: false }, { $set: { read: true }}, { multi: true })

  getSharedConnections: (userId)->
    user = Meteor.users.findOne(userId)
    currentUser = Meteor.users.findOne(this.userId)
    sharedConnections = Meteor.linkedinConnections.aggregate([
       {
        $match: { userLinkedInId: { $in: [user.profile.id, currentUser.profile.id] }, id: {$ne: 'private'} },
       },
       {
         $group: {
            _id: "$id",
            count: { $sum: 1 }
         }
       },
       { $match: { count: { $gt: 1 } } }
    ])
    commonIds = _.map(sharedConnections, (c)->c._id)

    if commonIds.length > 0 && currentUser.profile.id?
      return Meteor.linkedinConnections.find({'id': {$in: commonIds}, userLinkedInId: currentUser.profile.id}, {limit: 5}).fetch()

    return []
