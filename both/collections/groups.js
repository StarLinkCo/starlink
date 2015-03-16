Groups = new Mongo.Collection('groups');

Messages = new Meteor.Collection('messages');
/*
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
  },
  members: {
    type: [Object],
  }
}));
*/
