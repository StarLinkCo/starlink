Template.profile.helpers
  tmplName: ->
    return Session.get('tmplName')
  user: ->
    Meteor.user()

Template.profile.rendered = ->
  if Router.current().params.query.edit?
    IonModal.open('profileEdit')
