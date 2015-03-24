Template._connection.helpers
  getLinkedinProfieId: ->
    url.match(/.*id=(\d+)&.*/)[1] if url?
  notPrivate: (friend) ->
    !(friend.firstName == "private")