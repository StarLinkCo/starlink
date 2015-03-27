Template.qaShow.helpers
  answers: ->
    Answers.find({questionId: this._id})
  comments: ->
    QaComments.find({questionId: this._id})

Template.qaShow.events
  "click .show-comments-button": (e)->
    if Template.instance().$(".answer-comments").length > 0
      Template.instance().$(".answer-comments").remove()
    else
      Blaze.renderWithData(Template._answerComments, this, $(e.target).closest('.item').get(0))

  "click .tab-head-item": (e)->
    tab = $(e.target).closest('.tab-head-item').attr('data-tab')
    if tab == 'answers'
      $(".answers-tab").removeClass('hide')
      $(".comments-tab").addClass('hide')
    else
      $(".answers-tab").addClass('hide')
      $(".comments-tab").removeClass('hide')
