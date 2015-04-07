Template._groupMembers.helpers
  title: ->
    "Profile of: #{getUserName(this)}"

  isGroupCreator: (group)->
    group.createdById == Meteor.userId()

Template._groupMembers.events
  'click .profile-button': (e)->
    $(".modal-backdrop.active").remove()
    $("body").removeClass('modal-open')
    IonModal.close()
    Router.go("publicProfile", { _id: this._id })

  'click .kick-user-button': (e)->
    Meteor.call('kickUserFromGroup', { group: this.group, user: this.user}, ()->
      IonModal.close()
    )
