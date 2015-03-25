// client
Meteor.subscribe("userData");
Meteor.subscribe("tags");
//Meteor.subscribe("groups");
Meteor.subscribe("messages");
Meteor.subscribe("notifications", Meteor.userId());
