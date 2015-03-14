Template.calendar.helpers
  user: ->
    Meteor.user()
  events: ->
    Events.find()
