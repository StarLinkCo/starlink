Template.registerHelper 'memberOf', (group) ->
  Meteor.userId() && _.find group.members, (member) ->
    member.id == Meteor.userId()

Template.groups.helpers
  tmplName: ->
    return Session.get('tmplName')
  groups: ->
    return Groups.find({}, { sort: { marked: -1, updatedAt: -1, name: 1 } })
  times: ->
    [0..9]
  path: (group) ->
    if UI._globalHelpers.memberOf(group)
      "groups.item"
    else
      ""

Template.groups.events
  'click button.join-group': (event, template) ->
    event.preventDefault()

    if (Meteor.user() == null)
      Router.go('/profile')
      return

    if UI._globalHelpers.memberOf(this)
      alert('You are in this group already.')
      return
    if !this.members?
      this.members = []
    this.members.push
      id: Meteor.userId()
      picture: (if Meteor.user().profile then Meteor.user().profile.pictureUrl)

    modifies =
      count: @members.length
      members: @members
      updatedAt: (new Date())


    Groups.update @_id, {$set: modifies}, (error) ->
      if (error)
        alert(error.reason)

  'click button.leave-group': (event, template) ->
    event.preventDefault()

    if (Meteor.user() == null)
      Router.go('/profile')
      return

    if !UI._globalHelpers.memberOf(this)
      alert('you are not in this group')
      return

    if confirm("Do you want to leave this group?")
      this.members = _.without this.members,
        _.findWhere(this.members, {id: Meteor.userId()})

      modifies =
        count: @members.length
        members: @members
        updatedAt: (new Date())

      Groups.update @_id, {$set: modifies}, (error) ->
        if (error)
          alert(error.reason)
