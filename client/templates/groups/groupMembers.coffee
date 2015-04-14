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
    Router.go("publicProfile", { _id: this._id })

  'click .kick-user-button': (e)->
    e.stopPropagation()
    Meteor.call('kickUserFromGroup', { group: this.group, user: this.user})

  'click .profile-slide': (e)->
    Router.go("publicProfile", { _id: this._id })

renderSharedConnections = (self, group, index)->
  Meteor.call('getSharedConnections', group.members[index].id, (err, result)->
    ele = self.$('.ion-slide-box').find('.slick-active .shared-connections-wrapper')
    ele.html('')
    Blaze.renderWithData(Template._groupSharedConnections, result, ele.get(0))
  )

Template.groupMembers.rendered = ->
  group = this.data
  self = this
  index = getDefaultSlideIndex(group, Router.current().params._userId)
  renderSharedConnections(self, group, index)
  this.$('.ion-slide-box').on('onSlideChanged', (e)->
    renderSharedConnections(self, group, e.index)
  )
