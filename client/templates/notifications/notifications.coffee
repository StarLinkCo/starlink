Template.notifications.helpers
  notifications: ->
    Notifications.find()

  isPrivateGroupNotification: ->
    this.type == 'private_group'

Template.notifications.events
  "click .read-button": (e)->
    e.preventDefault()
    e.stopPropagation()
    Meteor.call('markNoticationRead', this._id)

  "click .notification-item": (e)->
    Meteor.call('markNoticationRead', this._id)
    if this.type == 'private_group'
      Router.go("private_group.show", { _id: this.privateGroupId })
