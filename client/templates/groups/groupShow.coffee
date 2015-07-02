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
    if (Meteor.user() == null)
      Router.go('/profile')
      return

    group = Router.current().data()
    mem_id = this.id

    if UI._globalHelpers.memberOf(group)
      Router.go('group.members', {_id: group._id, _userId: mem_id})
      return

    group.members.push
      id: Meteor.userId()
      picture: (if Meteor.user().profile then Meteor.user().profile.pictureUrl)

    modifies =
      count: group.members.length
      members: group.members

    Groups.update group._id, {$set: modifies}, (error) ->
      if (error)
        alert(error.reason)
      else
        Router.go('group.members', {_id: group._id, _userId: mem_id})
