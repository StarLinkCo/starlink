Tags.TagsMixin(Meteor.users);
Meteor.users.allowTags(function(){return true;});

Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 200,
    autoform: {
      'label-type': 'stacked'
    }
  },
  body: {
    type: String,
    autoform: {
      rows: 10,
      'label-type': 'stacked'
    }
  },
  published: {
    type: Boolean,
    defaultValue: true,
    autoform: {
      type: 'toggle'
    }
  }
}));
Tags.TagsMixin(Posts);
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
