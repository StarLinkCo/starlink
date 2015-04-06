// server
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'tags': 1, 'areasTags': 1, 'interestsTags': 1, 'summary': 1}});
  } else {
    this.ready();
  }
});

Meteor.publish("tags", function() {
  return Meteor.tags.find();
});

Meteor.publish("groups", function() {
  if (!this.userId) {
    return Groups.find({marked: true, hidden: {$ne: true}}, {sort: {marked: -1}})
  }
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Groups.find({});
  } else {
    return Groups.find({ $or: [{'members.id': this.userId}, { marked: true }], hidden: { $ne: true }}, { sort: {marked: -1}});
  }
});

/*
Meteor.publish("organizers", function() {
    return Organizers.find();
});
*/
Meteor.publish("events", function(limit) {
  var now = new Date();
  var hash = {startDate: {$gte: now}, status: { $in: ['Live', 'upcoming']}};
  if (this.userId && !Roles.userIsInRole(this.userId, 'admin')) {
    hash = _.extend({hidden: {$ne: true}}, hash)
  }
  return Events.find(hash, {limit: limit});
});

Meteor.publish("singleEvent", function(eventId) {
  return Events.find({_id: eventId});
});

Meteor.publish("links", function(limit) {
  return Links.find({}, { limit: limit });
});

Meteor.publish("comments", function(linkId) {
  check(linkId, String);
  return Comments.find({linkId: linkId});
});

Meteor.publish("singleUser", function(userId) {
  check(userId, String);
  return Meteor.users.find({ _id: userId });
});

Meteor.publish("groupUsers", function(groupId) {
  check(groupId, String);
  var group = Groups.findOne(groupId);
  var userIds = _.map(group.members, function(m) { return m.id });
  return Meteor.users.find({_id: { $in: userIds }}, { fields: {'profile.headline': 1, 'profile.pictureUrl': 1}});
});

Meteor.publish("groupMessages", function(groupId, limit) {
  check(groupId, String);
  limit = limit || 20;
  return Messages.find({groupId: groupId}, { limit: limit, sort: {created: -1} });
});

Meteor.publish("follows", function(opts) {
  if (opts == null) {
    opts = {};
  }
  check(opts.followingId, String);
  check(opts.followerId, String);
  return Follows.find({ followingId: opts.followingId, followerId: opts.followerId });
});

Meteor.publish("linkedin_connections", function(userId, limit) {
  check(userId, String);
  var userLinkedInId = Meteor.users.findOne(userId).profile.id;
  var limit = limit || 20;
  return Meteor.linkedinConnections.find({userLinkedInId: userLinkedInId}, {limit: limit});
});
Meteor.publish("sharedGroups", function(userId) {
  check(userId, String);
  //console.log(Groups.find({'members.id': {$all: [this.userId, userId]}}).fetch());
  return Groups.find({'members.id': {$all: [this.userId, userId]}});
});
Meteor.publish("sharedConnections", function(userId) {
  check(userId, String);

  user = Meteor.users.findOne(userId)
  currentUser = Meteor.users.findOne(this.userId)

  if (!user.profile || !currentUser.profile) {
    return [];
  }

  var sharedConnections = Meteor.linkedinConnections.aggregate([
     {
      $match: { userLinkedInId: { $in: [user.profile.id, currentUser.profile.id] }, id: {$ne: 'private'} },
     },
     {
       $group: {
          _id: "$id",
          count: { $sum: 1 }
       }
     },
     { $match: { count: { $gt: 1 } } }
  ]);

  var commonIds = _.map(sharedConnections, function(c) { return c._id});
  return Meteor.linkedinConnections.find({'id': {$in: commonIds}, userLinkedInId: currentUser.profile.id});
});

Meteor.publish("meetships", function(userId) {
  return Meetships.find({ $or: [{ userId: userId}, {meetUserId: userId}] });
});

Meteor.publish('notifications', function(){
  if (this.userId) {
    return Notifications.find({userId: this.userId});
  } else {
    return [];
  }
});

Meteor.publish("singleQuestions", function(questionId) {
  return Questions.find({_id: questionId});
});
Meteor.publish("questions", function(limit) {
  return Questions.find({}, {limit: limit, createdAt: -1});
});
Meteor.publish("answers", function(questionId) {
  return Answers.find({questionId: questionId}, {createdAt: -1});
});
Meteor.publish("qa_comments", function(questionId) {
  return QaComments.find({questionId: questionId}, {createdAt: -1});
});
Meteor.publish("eventGroup", function(eventId) {
  var event = Events.findOne(eventId);
  return Groups.find({_id: event.groupId});
});

Meteor.publish("private_groups", function(){
  return PrivateGroups.find({'members.id': this.userId});
});
Meteor.publish("private_messages", function(groupId){
  return PrivateMessages.find({privateGroupId: groupId});
});
