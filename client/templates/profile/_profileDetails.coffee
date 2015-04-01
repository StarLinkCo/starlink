Handle = {}
Template._profileDetails.helpers
  skills: ->
    if @profile? and @profile.skills?
      _.map @profile.skills.values, (value) ->
        value.skill.name
    else
      []

  isCurrentUserProfile: ->
    Meteor.userId() == this.user._id

Template._profileDetails.events
  'click .refresh-profile-button': (e)->
    e.preventDefault()
    $(e.target).attr("disabled", true)
    $(e.target).text("Refreshing Profile")
    Meteor.call('refreshProfile', (err, result)->
      console.log err
      if !err?
        $(e.target).text("Refreshed Profile")
    )
