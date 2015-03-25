questionsHandle = Meteor.subscribeWithPagination('questions', 15)

Template.qa.helpers
  questions: ->
    Questions.find()

  upvotedClass: ->
    userId = Meteor.userId()
    if userId && _.include(this.upvoters, userId)
      return 'disabled'

Template.qa.events
  "click .upvote-button": (e)->
    e.preventDefault()
    if $(e.target).hasClass('disabled')
      return
    Meteor.call('upvoteQuestion', this._id)

Template.qa.rendered = ->
  $('.qa-wrapper').scroll(->
    if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
      questionsHandle.loadNextPage()
  )
