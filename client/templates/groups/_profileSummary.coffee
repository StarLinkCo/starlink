Template._profileSummary.helpers
  title: ->
    "Profile of: #{getUserName(this.user)}"

Template._profileSummary.events
  'click .profile-button': (e)->
    $(".modal-backdrop.active").remove()
    $("body").removeClass('modal-open')
    IonModal.close()
    Router.go("publicProfile", { _id: this.user._id })
