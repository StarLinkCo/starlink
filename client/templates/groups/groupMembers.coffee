Template.groupMembers.helpers
  defaultSlideIndex: ->
    users = Meteor.users.find(_id: { $in: _.map(this.members, (m)->m.id) }).fetch()
    userIds = _.map(users, (u)->u._id)
    userId = Router.current().params._userId
    _.indexOf(userIds, userId)

  users: ->
    Meteor.users.find(_id: { $in: _.map(this.members, (m)->m.id) }).fetch()

  isGroupCreator: ()->
    this.createdById == Meteor.userId()

  notCurrentUser: (user)->
    Meteor.userId() != user._id

Template.groupMembers.events
  'click .profile-button': (e)->
    Router.go("publicProfile", { _id: this._id })

  'click .kick-user-button': (e)->
    Meteor.call('kickUserFromGroup', { group: this.group, user: this.user})

