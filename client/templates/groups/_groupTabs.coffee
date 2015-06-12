Template._eventTabs.events
  'click .group-chat': (event, template) ->
    event.preventDefault()

    if (Meteor.user() == null)
      Router.go('/profile')
      return

    if UI._globalHelpers.memberOf(template.data.group)
      Router.go('group.chat', {_id: template.data.event.groupId})
      return

    template.data.group.members.push
      id: Meteor.userId()
      picture: (if Meteor.user().profile then Meteor.user().profile.pictureUrl)

    modifies =
      count: template.data.group.members.length
      members: template.data.group.members


    Groups.update template.data.event.groupId, {$set: modifies}, (error) ->
      if (error)
        alert(error.reason)
      else
        Router.go('group.chat', {_id: template.data.event.groupId})

