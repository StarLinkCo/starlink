Template._adminActions.events
  'change input.hide': (event) ->
    Meteor.call('toggleEvent', @event._id, 'hidden', event.target.checked)

  'change input.mark': (event, template) ->
    Meteor.call('toggleEvent', @event._id, 'marked', event.target.checked)

  'change input.highlight': (event, template) ->
    Meteor.call('toggleEvent', @event._id, 'highlighted', event.target.checked)

  'click button.create-group': (event, template) ->
    Meteor.call('createEventGroup', @event._id)
