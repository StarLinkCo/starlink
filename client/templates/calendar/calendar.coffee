eventsHandle = Meteor.subscribeWithPagination('events', 10)

Template.calendar.helpers
  user: ->
    Meteor.user()
  events: ->
    Events.find({}, { sort: { marked: -1, startDate: 1 } })
  itemClass: ->
    if @highlighted then 'positive' else ''

  meetupEvent: ->
    this.event_source == 'meetup'

Template.calendar.rendered = ->
  $('.events-wrapper').scroll(->
    if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
      eventsHandle.loadNextPage()
  )
