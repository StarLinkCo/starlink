Template.calendar.helpers
  user: ->
    Meteor.user()
  events: ->
    now = new Date()
    Events.find({ startDate: { $gt: now }, status: { $ne: 'Draft' } }, { sort: { startDate: 1 } })
