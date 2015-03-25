Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createMeetNotification = function(meetUserId) {
  var userToMeet = Meteor.users.findOne(meetUserId);
  var currentUserId = Meteor.userId();
  Notifications.insert({
    meetUserId: currentUserId,
    meetUserName: (Meteor.user.profile ? Meteor.user.profile.firstName : ''),
    userId: userToMeet._id,
    read: false
  });
};
