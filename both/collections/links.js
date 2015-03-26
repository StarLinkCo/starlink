Links = new Meteor.Collection('links');
Links.attachSchema(new SimpleSchema({
  url: {
    type: String,
    max: 200,
    regEx: SimpleSchema.RegEx.Url,
    autoform: {
      'label-type': 'stacked'
    },
    optional: true
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
    optional: true,
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
  thumbnail: {
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
  },
  upvoters: {
    type: [String],
    optional: true
  },
  votesCount: {
    type: Number,
    optional: true
  }
}));

Comments = new Meteor.Collection('comments');

getUserEmail = function(user) {
  return user.profile ? user.profile.emailAddress : user.emails[0].address;
};

getUserName = function(user) {
  return user.profile ? (user.profile.firstName + " " + user.profile.lastName) : '';
};

getUserHeadline = function(user) {
  return user.profile ? user.profile.headline : '';
};

getUserPicture = function(user) {
  return user.profile ? user.profile.pictureUrl : '';
};
