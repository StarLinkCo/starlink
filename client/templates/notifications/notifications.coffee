Template.notifications.helpers
  notifications: ->
    Notifications.find()

  isPrivateGroupNotification: ->
    this.type == 'private_group'

Template.notifications.events
  "click .read-button": (e)->
    Meteor.call('markNoticationRead', this._id)
