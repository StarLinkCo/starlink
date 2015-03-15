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

Organizers = new Mongo.Collection('organizers');
/*
OrganizerSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    organizer_id: {
        type: String,
        label: "ID",
        max: 20
    }
});
*/

Events = new Mongo.Collection('events');
Events.before.insert(function (userId, doc) {
  doc.startDate = new Date(doc.start_date);
});
Links = new Meteor.Collection('links');
Links.attachSchema(new SimpleSchema({
  url: {
    type: String,
    max: 200,
    regEx: SimpleSchema.RegEx.Url,
    autoform: {
      'label-type': 'stacked'
    }
  },
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
  userId: {
    type: String,
    optional: true
  },
  userEmail: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  }
}));
