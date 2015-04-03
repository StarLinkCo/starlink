Groups = new Mongo.Collection('groups');

Messages = new Meteor.Collection('messages');

MemberSchema = new SimpleSchema({
  id: {
    type: String,
    optional: true
  },
  picture: {
    type: String ,
    optional: true
  }
});

Groups.attachSchema(new SimpleSchema({
  name: {
    type: String,
    max: 200,
    autoform: {
      'label-type': 'stacked'
    }
  },
  desc: {
    type: String,
    autoform: {
      rows: 10,
      'label-type': 'stacked'
    }
  },
  count: {
    type: Number,
    optional: true
  },
  members: {
    type: [MemberSchema],
    optional: true
  },
  eventId: {
    type: String,
    optional: true
  },
  marked: {
    type: Boolean,
    optional: true
  }
}));
