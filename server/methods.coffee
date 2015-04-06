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
    Meetships.insert({
      userId: Meteor.userId(),
      meetUserId: meetUserId,
      connected: false
    })
    createMeetNotification(this.userId, meetUserId)
    user = Meteor.users.findOne(Meteor.userId())
    meetUser = Meteor.users.findOne(meetUserId)
    PrivateGroups.insert({
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
      ]
    })

  acceptMeet: (userId)->
    meetship = Meetships.findOne({userId: userId, meetUserId: Meteor.userId(), connected: false})
    if meetship
      Meetships.update(meetship._id, {userId: userId, meetUserId: Meteor.userId(), connected: true})

  kickUserFromGroup: (opts={})->
    Groups.update(opts.group._id, { $pull: { 'members': { id: opts.user._id }}})

  markNoticationRead: (notificationId)->
    Notifications.update({_id: notificationId}, { $set: { read: true }})

  addQuestion: (opts={})->
    questionId = Questions.insert({
      content: opts.content,
      authorId: Meteor.userId(),
      authorName: getUserName(Meteor.user()),
      createdAt: Date.now(),
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
      createdAt: Date.now()
    })
    Answers.update(opts.answer._id, { $inc: { commentsCount: 1 } })

  createEventGroup: (eventId)->
    if Roles.userIsInRole(Meteor.userId(), 'admin')
      event = Events.findOne(eventId)
      console.log event
      unless event.groupId
        name = event.title
        time = event.startDate
        if event.venue
          address = "#{event.venue.address},#{event.venue.address_2},#{event.venue.city}, #{event.venue.region}, #{event.venue.postal_code}"
        if event.event_source == 'meetup'
          name = event.name
          if event.venue
            address = "#{event.venue.address_1},#{event.venue.address_2},#{event.venue.city}, #{event.venue.state}, #{event.venue.zip}"
        console.log(name)
        console.log(address)
        groupId = Groups.insert({
          name: name
          desc: "time: #{time}\naddress: #{address}"
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
      if Date.now() < expiredDate
        extraFields = 'first-name,headline,id,last-name,site-standard-profile-request,email-address,location:(name),num-connections,picture-url,public-profile-url,skills,languages,three-current-positions,recommendations-received'
        url = 'https://api.linkedin.com/v1/people/~:(' + extraFields + ')'
        response = Meteor.http.get(url, {
            params: {
                oauth2_access_token: accessToken,
                format: 'json'
            }
        }).data
        Meteor.users.update(Meteor.userId(), { $set: { profile: response }})

  increaseLogin: ()->
    user = Meteor.users.findOne(Meteor.userId())
    Meteor.users.update(user._id, { $inc: { loginCount: 1} })
    (user.loginCount || 1)
