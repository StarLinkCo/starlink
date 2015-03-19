Template.profile.helpers
  tmplName: ->
    return Session.get('tmplName')
  user: ->
    Meteor.user()
