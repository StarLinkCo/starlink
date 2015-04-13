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
  'click .skill-toggle': (e)->
    $('.skill-toggle').remove()
    $('.skill-name.hide').removeClass('hide')
