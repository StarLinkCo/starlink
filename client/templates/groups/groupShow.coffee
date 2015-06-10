Template.groupShow.helpers
  profilePath: ->
    UI._globalHelpers.pathFor 'user.profile',
      hash:
        data:
          _id: @_id
  profileSummary: (id)->
    user: Meteor.users.findOne(this.id)
    group: @

Template.groupShow.events
  'click button.leave-group': (event, template) ->
    event.preventDefault()

    if confirm("Do you want to leave this group?")
      if (Meteor.user() == null)
        Router.go('/profile')
        return

      if !UI._globalHelpers.memberOf(@)
        alert('You are not in this group.')
        return
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

  'click button.group-edit': (event, template) ->
    Router.go('group.edit', {_id: @_id})

  'click .member-link': (e)->
    group = Router.current().data()
    Router.go('group.members', {_id: group._id, _userId: this.id})
