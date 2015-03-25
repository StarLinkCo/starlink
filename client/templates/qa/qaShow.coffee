Template.qaShow.helpers
  answers: ->
    Answers.find({questionId: this._id})
  comments: ->
    QaComments.find({questionId: this._id})
