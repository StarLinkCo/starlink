Template.notifications.helpers
  notifications: ->
    Notifications.find()

Template.notifications.events
  "click .read-button": (e)->
    Meteor.call('markNoticationRead', this._id)
