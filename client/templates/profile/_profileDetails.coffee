Template._profileDetails.helpers
  skills: ->
    _.map @profile.skills.values, (value) ->
      value.skill.name
  connections: ()->
    Meteor.linkedinConnections.find({userLinkedInId: @profile.id})