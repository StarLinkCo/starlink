Template._profileDetails.helpers
  getid: ->
    url.match(/.*id=(\d+)&.*/)[1] if url?
  notprivate: (friend) ->
    !(friend.firstName == "private")
