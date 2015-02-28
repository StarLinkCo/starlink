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

Groups = new Mongo.Collection('groups');

Posts.attachSchema(new SimpleSchema({
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