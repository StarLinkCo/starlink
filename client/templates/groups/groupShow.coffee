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

    if confirm("Are you sure?")
      if (Meteor.user() == null)
        alert('Login first')
        return

      if !UI._globalHelpers.memberOf(@)
        alert('you are not in this group')
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
    users = Meteor.users.find({_id: { $in: _.map(group.members, (m)-> m.id)}}).fetch()
    userIds = _.map(users, (u)->u._id)
    initialIndex = _.indexOf(userIds, this.id)
    Session.set('ion-slide-initial-slide', initialIndex)
    IonModal.open('_groupMembers', { users: users, group: Router.current().data() })
