eventsHandle = Meteor.subscribeWithPagination('events', 10)

Template.calendar.helpers
  user: ->
    Meteor.user()
  events: ->
    Events.find({}, { sort: { marked: -1, startDate: 1 } })

  background: ->
    if @highlighted then '#eeeeee' else 'white'

  meetupEvent: ->
    this.event_source == 'meetup'

  getDateDay: (datetime) ->
    return moment(datetime).format('Do')

  getDateMonth: (datetime) ->
    return moment(datetime).format('MMM')

  getDay: (datetime) ->
    return moment(datetime).format('ddd')

  getTime: (datetime) ->
    return moment(datetime).format('h:mm a')

Template.calendar.rendered = ->
  $('.events-wrapper').scroll(->
    if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
      eventsHandle.loadNextPage()
  )
