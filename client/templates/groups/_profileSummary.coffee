Template._profileSummary.helpers
  title: ->
    "Profile of: #{this.user.id}"

Template._profileSummary.events
  'click .profile-button': (e)->
    IonModal.close()
    Router.go("publicProfile", { _id: this.user.id })
