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

Template.PrivateGroupShow.events
  'keyup #messageBox': (event) ->
    if (event.type == "keyup" && event.which == 13)
      newMessage = Template.instance().$("#messageBox")

      if newMessage
        userName = Meteor.user().profile.firstName
        avatar = Meteor.user().profile.pictureUrl

      PrivateMessages.insert
        privateGroupId: @_id
        name: userName
        message: newMessage.val()
        created: new Date()
        avatar: avatar

      newMessage.val("")
      newMessage.focus()

      # Make sure new chat messages are visible
      $(".content").scrollTop 9999999
