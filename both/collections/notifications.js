Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createMeetNotification = function(currentUserId, meetUserId) {
  var userToMeet = Meteor.users.findOne(meetUserId);
  var currentUser = Meteor.users.findOne(currentUserId);
  Notifications.insert({
    meetUserId: currentUserId,
    meetUserName: (currentUser.profile ? currentUser.profile.firstName : ''),
    userId: userToMeet._id,
    read: false,
    type: 'meet'
  });
};

createPrivateGroupNotification = function(groupId, currentUserId, meetUserId) {
  var userToMeet = Meteor.users.findOne(meetUserId);
  var currentUser = Meteor.users.findOne(currentUserId);
  Notifications.insert({
    userId: userToMeet._id,
    meetUserId: currentUserId,
    meetUserName: (currentUser.profile ? currentUser.profile.firstName : ''),
    read: false,
    privateGroupId: groupId,
    type: 'private_group'
  })
}
