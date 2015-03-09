Template.profile.helpers
  tmplName: ->
    return Session.get('tmplName')
  user: ->
    Meteor.user()
  getid: ->
    url.match(/.*id=(\d+)&.*/)[1] if url?
  notprivate: (friend) ->
    !(friend.firstName == "private")