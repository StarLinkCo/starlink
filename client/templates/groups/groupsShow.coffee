Template.groupsShow.helpers
  members: ->
    console.log('members is :', this._id)
    Groups.findOne(this._id).members
  currentUserName: ->
    Meteor.user().profile.firstName
  messages: ->
    Messages.find {},
      sort:
        time: -1

Template.groupsShow.events
  'keyup #messageBox': (event) ->
    if (event.type == "keyup" && event.which == 13)
      newMessage = Template.instance().$("#messageBox")

      if newMessage
        userName = Meteor.user().profile.firstName
        avatar = Meteor.user().profile.pictureUrl
        console.log('msg = ', newMessage.val())

      Messages.insert
        name: userName
        message: newMessage.val()
        created: new Date()
        avatar: avatar

        newMessage.val("")
        newMessage.focus()

        # Make sure new chat messages are visible
        $("#chat").scrollTop 9999999;
