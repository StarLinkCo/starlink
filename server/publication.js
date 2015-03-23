// server
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'tags': 1, 'areasTags': 1, 'interestsTags': 1}});
  } else {
    this.ready();
  }
});

Meteor.publish("tags", function() {
  return Meteor.tags.find();
});

Meteor.publish("groups", function() {
  return Groups.find();
});

Meteor.publish("messages", function() {
  return Messages.find();
});
/*
Meteor.publish("organizers", function() {
    return Organizers.find();
});
*/
Meteor.publish("events", function(limit) {
  if (this.userId) {
    var now = new Date();
    var hash = {startDate: {$gte: now}, status: {$eq: 'Live'}};
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      hash = _.extend({hidden: {$ne: true}}, hash)
    }
    return Events.find(hash, {limit: limit});
  }
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
  return Meteor.users.find({_id: { $in: userIds }});
});

Meteor.publish("follows", function(opts) {
  if (opts == null) {
    opts = {};
  }
  check(opts.followingId, String);
  check(opts.followerId, String);
  return Follows.find({ followingId: opts.followingId, followerId: opts.followerId });
});

Meteor.publish("linkedin_connections", function(userLinkedInId) {
  return Meteor.linkedinConnections.find({userLinkedInId: userLinkedInId});
});
Meteor.publish("sharedGroups", function(userId) {
  check(userId, String);
  //console.log(Groups.find({'members.id': {$all: [this.userId, userId]}}).fetch());
  return Groups.find({'members.id': {$all: [this.userId, userId]}});
});

Meteor.publish("meetships", function(userId) {
  return Meetships.find({ $or: [{ userId: userId}, {meetUserId: userId}] });
});
