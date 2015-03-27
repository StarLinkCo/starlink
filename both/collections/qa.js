Questions = new Mongo.Collection('questions');
Answers = new Mongo.Collection('answers');
QaComments = new Mongo.Collection('qa_comments');

Tags.TagsMixin(Questions);

Questions.allowTags(function () {
  return true;
});

Questions.attachSchema(new SimpleSchema({
  content: {
    type: String,
    max: 1000,
    autoform: {
      'label-type': 'stacked'
    }
  },
  authorId: {
    type: String,
    optional: true
  },
  authorName: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  answersCount: {
    type: Number,
    optional: true
  },
  tags: {
    type: [String],
    optional: true
  },
  upvoters: {
    type: [String],
    optional: true
  },
  votesCount: {
    type: Number,
    optional: true
  },
  commentsCount: {
    type: Number,
    optional: true
  }
}));

Answers.attachSchema(new SimpleSchema({
  content: {
    type: String,
    autoform: {
      'label-type': 'stacked'
    }
  },
  questionId: {
    type: String,
    optional: true
  },
  authorId: {
    type: String,
    optional: true
  },
  authorName: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  commentsCount: {
    type: Number,
    optional: true
  }
}));

QaComments.attachSchema(new SimpleSchema({
  content: {
    type: String,
    autoform: {
      'label-type': 'stacked'
    }
  },
  questionId: {
    type: String,
    optional: true
  },
  answerId: {
    type: String,
    optional: true
  },
  authorId: {
    type: String,
    optional: true
  },
  authorName: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  }
}));
