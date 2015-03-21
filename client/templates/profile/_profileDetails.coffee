Template._profileDetails.helpers
  getLinkedinProfieId: ->
    url.match(/.*id=(\d+)&.*/)[1] if url?
  notprivate: (friend) ->
    !(friend.firstName == "private")
  connections: ->
    Meteor.linkedinConnections.find()
