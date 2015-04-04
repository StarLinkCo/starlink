Template.groupLayout.events
  'click button.leave-group': (event, template) ->
    console.log(this)
    event.preventDefault()

    if confirm("Are you sure?")
      if (Meteor.user() == null)
        alert('Login first')
        return

      if !UI._globalHelpers.memberOf(@)
        alert('you are not in this group')
        return
      console.log("leave id: ", Meteor.userId())
      this.members = _.without this.members,
        _.findWhere(this.members, {id: Meteor.userId()})

      modifies =
        count: @members.length
        members: @members


      Groups.update @_id, {$set: modifies}, (error) ->
        if (error)
          alert(error.reason)
        else
          Router.go("groups")