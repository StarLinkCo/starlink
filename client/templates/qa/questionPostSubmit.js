AutoForm.addHooks(
  'answerForm',
  {
    before: {
      insert: function (doc) {
        doc.authorId = Meteor.userId();
        doc.authorName = getUserName(Meteor.user());
        doc.createdAt = Date.now();
        doc.commentsCount = 0;
        Questions.update(doc.questionId, { $inc: { answersCount: 1 } })
        return doc;
      }
    }
  }
);
