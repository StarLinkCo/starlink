Template._adminActions.events
  'change input.hide': (event) ->
    Meteor.call('toggleEntity', 'events', @event._id, 'hidden', event.target.checked)

  'change input.mark': (event, template) ->
    Meteor.call('toggleEntity', 'events', @event._id, 'marked', event.target.checked)

  'change input.highlight': (event, template) ->
    Meteor.call('toggleEntity', 'events', @event._id, 'highlighted', event.target.checked)

  'click button.create-group': (event, template) ->
    Meteor.call('createEventGroup', @event._id)

  'click #save-event-button': (e)->
    e.preventDefault()
    eventImageUrl = $("#event-image-input").val()
    eventName = $("#event-name-input").val()
    data = {
      eventId: this.event._id
      imageUrl: eventImageUrl
      name: eventName
    }
    Meteor.call('updateEvent', data, (err, result)->
      if !err?
        alert('Event updated')
    )
