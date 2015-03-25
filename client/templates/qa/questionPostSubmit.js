AutoForm.addHooks(
  'questionForm',
  {
    before: {
      insert: function (doc) {
        doc.authorId = Meteor.userId();
        doc.createdAt = Date.now();
        return doc;
      }
    },
    onSuccess: function (operation, question, template) {
      Router.go('qa.show', {_id: question});
    }
  }
);
AutoForm.addHooks(
  'answerForm',
  {
    before: {
      insert: function (doc) {
        doc.authorId = Meteor.userId();
        doc.createdAt = Date.now();
        Questions.update(doc.questionId, { $inc: { answersCount: 1 } })
        return doc;
      }
    }
  }
);
AutoForm.addHooks(
  'qaCommentForm',
  {
    before: {
      insert: function (doc) {
        doc.authorId = Meteor.userId();
        doc.createdAt = Date.now();
        Questions.update(doc.questionId, { $inc: { commentsCount: 1 } })
        return doc;
      }
    }
  }
);
