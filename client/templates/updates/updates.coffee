Template.updates.helpers
  links: ->
    Links.find()

  upvotedClass: ->
    userId = Meteor.userId()
    if userId && _.include(this.upvoters, userId)
      return 'disabled'

Template.updates.events
  "click .upvote-button": (e)->
    e.preventDefault()
    if $(e.target).hasClass('disabled')
      return
    Meteor.call('upvoteLink', this._id)
