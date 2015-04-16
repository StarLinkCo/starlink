welcomeGroupName = Meteor.settings.welcome_group
Template.profile.helpers
  tmplName: ->
    return Session.get('tmplName')
  user: ->
    Meteor.user()

  welcomeGroupMembers: ->
    group = Groups.findOne({name: 'Welcome to StarLink'})
    if group
      return _.sample(group.members, 16)
    else
      return []

Template.profile.rendered = ->
  if Router.current().params.query.edit?
    IonModal.open('profileEdit')

Template.ionBody.events
  'click .refresh-profile-button': (e)->
    e.preventDefault()
    IonLoading.show({
      delay: 100
      customTemplate: '<span class="refresh-profile-notice">Refreshing your profile</span> <i class="icon ion-loading-d"></i>'
      backdrop: true
    })
    Meteor.call('refreshProfile', (err, result)->
      if err?
        alert("Failed to refresh your profile from linkedin, you could relogin to update profile instead.")
      IonLoading.hide()
    )
