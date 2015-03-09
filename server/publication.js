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