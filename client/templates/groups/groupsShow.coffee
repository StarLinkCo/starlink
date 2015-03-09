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
      newMessage = template.$("#messageBox")

      if newMessage
        userName = Meteor.user().profile.firstName
        console.log('msg is, ', newMessage.val())

      	Messages.insert
      	  name: userName
      	  message: newMessage.val()
      	  created: new Date()

        newMessage.val("")
        newMessage.focus()