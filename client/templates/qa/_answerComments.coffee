Template._answerComments.helpers
  comments: ->
    QaComments.find({answerId: this._id})

Template._answerComments.events
  "submit form": (e)->
    e.preventDefault()
    content = Template.instance().$(".answer-comment-content").val()
    Meteor.call("addAnswerComment", { answer: this, content: content}, ()->
      e.target.answerCommentContent.value = ''
    )

Template._answerComments.rendered = ->
  this.$(".answer-comment-content").focus()
