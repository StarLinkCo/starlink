Template._groupTabs.events
  'click .group-chat': (event, template) ->
    event.preventDefault()

    if (Meteor.user() == null)
      Router.go('/profile')
      return

    if UI._globalHelpers.memberOf(this)
      Router.go('group.chat', {_id: @_id})
      return

    this.members.push
      id: Meteor.userId()
      picture: (if Meteor.user().profile then Meteor.user().profile.pictureUrl)

    modifies =
      count: this.members.length
      members: this.members

    Groups.update @_id, {$set: modifies}, (error) ->
      if (error)
        alert(error.reason)
      else
        Router.go('group.chat', {_id: @_id})

