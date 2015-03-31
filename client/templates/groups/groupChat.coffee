Template.groupChat.helpers
  id: ->
    _id: @_id
  members: ->
    console.log('members is :', @_id)
    @members
  currentUserName: ->
    Meteor.user().profile.firstName
  messages: ->
    Messages.find {groupId: @_id},
      sort:
        time: -1

Template.groupShow.events
  'keyup #messageBox': (event) ->
    if (event.type == "keyup" && event.which == 13)
      newMessage = Template.instance().$("#messageBox")

      if newMessage
        userName = Meteor.user().profile.firstName
        avatar = Meteor.user().profile.pictureUrl
        console.log('msg = ', newMessage.val())

      Messages.insert
        groupId: @_id
        name: userName
        message: newMessage.val()
        created: new Date()
        avatar: avatar

      newMessage.val("")
      newMessage.focus()

      # Make sure new chat messages are visible
      $(".content").scrollTop 9999999
