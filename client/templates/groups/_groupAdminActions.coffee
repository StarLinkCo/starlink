Template._groupAdminActions.events
  'change input.hide': (e) ->
    Meteor.call('toggleGroup', this._id, 'hidden', event.target.checked)

  'change input.mark': (event, template) ->
    Meteor.call('toggleGroup', this._id, 'marked', event.target.checked)
