Template._profileSummary.helpers
  title: ->
    "Profile of: #{getUserName(this.user)}"

  isGroupCreator: ->
    this.group.createdById == Meteor.userId()

Template._profileSummary.events
  'click .profile-button': (e)->
    $(".modal-backdrop.active").remove()
    $("body").removeClass('modal-open')
    IonModal.close()
    Router.go("publicProfile", { _id: this.user._id })

  'click .kick-user-button': (e)->
    Meteor.call('kickUserFromGroup', { group: this.group, user: this.user}, ()->
      IonModal.close()
    )
