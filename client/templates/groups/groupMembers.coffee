Template.groupMembers.helpers
  defaultSlideIndex: ->
    users = Meteor.users.find(_id: { $in: _.map(this.members, (m)->m.id) }).fetch()
    userIds = _.map(users, (u)->u._id)
    userId = Router.current().params._userId
    _.indexOf(userIds, userId)

  user: ->
    userId = Router.current().params._userId
    Meteor.users.findOne(userId)

  isGroupCreator: ()->
    this.createdById == Meteor.userId()

  notCurrentUser: (user)->
    Meteor.userId() != user._id

  sharedConnections: ->
    Meteor.linkedinConnections.find(userLinkedInId: Meteor.user().profile.id)

Template.groupMembers.events
  'click .profile-button': (e)->
    Router.go("publicProfile", { _id: this._id })

  'click .kick-user-button': (e)->
    e.stopPropagation()
    Meteor.call('kickUserFromGroup', { group: this.group, user: this.user})

  'click .profile-slide': (e)->
    Router.go("publicProfile", { _id: this._id })

Template.groupMembers.rendered = ->
  currentUserId = Router.current().params._userId
  group = Router.current().data()
  members = Router.current().data().members
  currentIndex = _.indexOf(_.map(members, (m)->m.id), currentUserId)
  if currentIndex == (members.length - 1)
    prevIndex = currentIndex - 1
    nextIndex = 0
  else if currentIndex == 0
    prevIndex = members.length - 1
    nextIndex = 1
  else
    prevIndex = currentIndex - 1
    nextIndex = currentIndex + 1

  hammertime = new Hammer($('.profile-wrapper').get(0))
  hammertime.on('swipeleft swiperight', (event)->
    if event.type == 'swipeleft'
      Router.go('group.members', { _id: group._id, _userId: members[prevIndex].id})
    else
      Router.go('group.members', { _id: group._id, _userId: members[nextIndex].id})
  )
