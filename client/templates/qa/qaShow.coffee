Template.qaShow.helpers
  answers: ->
    Answers.find({questionId: this._id})
