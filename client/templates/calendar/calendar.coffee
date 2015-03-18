eventsHandle = Meteor.subscribeWithPagination('events', 10)

Template.calendar.helpers
  user: ->
    Meteor.user()
  events: ->
    Events.find({}, { sort: { startDate: 1 } })

Template.calendar.rendered = ->
  $('.events-wrapper').scroll(->
    if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
      eventsHandle.loadNextPage()
  )
