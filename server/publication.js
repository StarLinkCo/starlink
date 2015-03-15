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
Meteor.publish("events", function() {
    return Events.find();
});

Meteor.publish("links", function() {
  return Links.find();
});

Meteor.publish("comments", function() {
  return Comments.find();
});
