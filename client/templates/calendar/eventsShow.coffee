Template.eventsShow.helpers
  member: ->
    UI._globalHelpers.memberOf(@group)

Template.eventsShow.events
  'click button.join-group': (event, template) ->
    console.log(this)
    event.preventDefault()

    if (Meteor.user() == null)
      alert('Please login')
      return

    if UI._globalHelpers.memberOf(@group)
      Router.go('group.show', {_id: @event.groupId})
      return

    @group.members.push
      id: Meteor.userId()
      picture: (if Meteor.user().profile then Meteor.user().profile.pictureUrl)

    modifies =
      count: @group.members.length
      members: @group.members


    Groups.update @event.groupId, {$set: modifies}, (error) ->
      if (error)
        alert(error.reason)
      else
        Router.go('group.show', {_id: @event.groupId})
