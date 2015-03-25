Questions = new Mongo.Collection('questions');
Answers = new Mongo.Collection('answers');

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
  createdAt: {
    type: Date,
    optional: true
  },
}));
