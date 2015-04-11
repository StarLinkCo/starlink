Handle = {}
Template._profileDetails.helpers
  skills: ->
    if @profile? and @profile.skills?
      _.map @profile.skills.values, (value) ->
        value.skill.name
    else
      []

  skillsToDisplay: ->
    skillsName = getSkillsFromProfile(@profile)
    skillsName[0..6]

  skillsToToggle: (skills)->
    skillsName = getSkillsFromProfile(@profile)
    if skillsName.length > 6
      skillsName[7..-1]
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
      if !err?
        $(e.target).text("Refreshed Profile")
    )

  'click .skill-toggle': (e)->
    $('.skill-toggle').remove()
    $('.skill-name.hide').removeClass('hide')
