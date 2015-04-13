handle = {}
Template.PrivateGroupShow.helpers

  groupName: (privateGroup)->
    if !privateGroup? || !privateGroup.members?
      return ''
    members = privateGroup.members
    if members[0].id == Meteor.userId()
      members[1].userName
    else
      members[0].userName

  messages: ->
    PrivateMessages.find()

  displayMessageTime: ->
    if !this.created?
      return null
    lastCreated = handle.lastCreated
    if !lastCreated?
      handle.lastCreated = this.created
      lastCreated = this.created
      return moment(this.created).format('llll')
    difference = Math.abs(lastCreated.getTime() - this.created.getTime())
    resultInMinutes = Math.round(difference / 60000)
    if resultInMinutes > 10
      handle.lastCreated =  this.created
      moment(this.created).format('llll')
    else
      null

Template.PrivateGroupShow.events
  'keyup #messageBox': (event) ->
    if (event.type == "keyup" && event.which == 13)
      newMessage = Template.instance().$("#messageBox")

      if newMessage && !_.isEmpty(newMessage.val())
        Meteor.call('sendPrivateMessage', { groupId: @_id, content: newMessage.val() }, (err, result)->
          newMessage.val("")
          newMessage.focus()

          # Make sure new chat messages are visible
          $(".content").scrollTop 9999999
        )
