Template.profile.helpers
  tmplName: ->
    return Session.get('tmplName')
  user: ->
    Meteor.user()

Template.profile.rendered = ->
  if Router.current().params.query.edit?
    IonModal.open('profileEdit')

Template.ionBody.events
  'click .refresh-profile-button': (e)->
    e.preventDefault()
    IonLoading.show({
      delay: 100
    })
    Meteor.call('refreshProfile', (err, result)->
      IonLoading.hide()
    )