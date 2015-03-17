Template.updates.helpers
  links: ->
    Links.find()

  upvotedClass: ->
    userId = Meteor.userId()
    if userId && _.include(this.upvoters, userId)
      return 'disabled'

  domain: ->
    a = document.createElement('a')
    a.href = this.url
    a.hostname

Template.updates.events
  "click .upvote-button": (e)->
    e.preventDefault()
    if $(e.target).hasClass('disabled')
      return
    Meteor.call('upvoteLink', this._id)

Template.updates.rendered = ->
  $('.updates-wrapper').scroll(->
    if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
      console.log 'load more'
  )
