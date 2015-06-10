getDefaultSlideIndex = (group, userId)->
  _.indexOf(_.map(group.members, (m)->m.id), userId)

Template.groupMembers.helpers
  defaultSlideIndex: ->
    getDefaultSlideIndex(this, Router.current().params._userId)

  users: ->
    group = this
    userIds = _.map(group.members, (m)->m.id)
    _.sortBy(Meteor.users.find(_id: { $in: userIds}).fetch(), (u)->_.indexOf(userIds, u._id))

  isGroupCreator: ()->
    this.createdById == Meteor.userId()

  notCurrentUser: (user)->
    Meteor.userId() != user._id

  # sharedConnections: ->
  #   Meteor.linkedinConnections.find(userLinkedInId: Meteor.user().profile.id)

  backUrl: ->
    "/groups/#{this._id}"

Template.groupMembers.events
  'click .profile-button': (e)->
    e.preventDefault()
    window.open(this.profile?.publicProfileUrl, '_blank', 'location=no')

  'click .kick-user-button': (e)->
    e.stopPropagation()
    Meteor.call('kickUserFromGroup', { group: this.group, user: this.user})

  'click .profile-slide': (e)->
    e.preventDefault()
    window.open(this.profile?.publicProfileUrl, '_blank', 'location=no')

Template.groupMembers.rendered = ->
  group = this.data
  self = this
  $('.user-summary').height($(window).height() - 420)
  index = getDefaultSlideIndex(group, Router.current().params._userId)
