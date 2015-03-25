questionsHandle = Meteor.subscribeWithPagination('questions', 15)

Template.qa.helpers
  questions: ->
    Questions.find()

Template.qa.rendered = ->
  $('.qa-wrapper').scroll(->
    if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
      questionsHandle.loadNextPage()
  )
