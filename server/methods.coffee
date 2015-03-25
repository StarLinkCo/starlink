Meteor.methods
  updateProfile: (doc, modifier, id) ->
    #Important server-side check for security and data integrity
    check(doc, Schema.profile)
    Meteor.users.update(id, {$set: {"profile.roles": doc.roles}})
    console.log(Meteor.users.findOne(id).profile.roles)

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

  toggleEvent: (eventId, attribute, value) ->
    if Roles.userIsInRole(Meteor.userId(), 'admin')
      if value
        modifier = {$set: {}}
        modifier['$set'][attribute] = value
      else
        modifier = {$unset: {}}
        modifier['$unset'][attribute] = value
        
      Events.update({_id: eventId}, modifier)
    else
      throw new Meteor.Error(403, "Not authorized")

  meetUser: (meetUserId)->
    Meetships.insert({
      userId: Meteor.userId(),
      meetUserId: meetUserId,
      connected: false
    })

  acceptMeet: (userId)->
    meetship = Meetships.findOne({userId: userId, meetUserId: Meteor.userId(), connected: false})
    if meetship
      Meetships.update(meetship._id, {userId: userId, meetUserId: Meteor.userId(), connected: true})

  kickUserFromGroup: (opts={})->
    Groups.update(opts.group._id, { $pull: { 'members': { id: opts.user._id }}})

  addQuestion: (opts={})->
    questionId = Questions.insert({
      content: opts.content,
      authorId: Meteor.userId(),
      createdAt: Date.now(),
      answersCount: 0
    })
    question = Questions.findOne(questionId)
    _.each opts.tags, (tag)->
      Questions.addTag(tag, { _id: question._id })
