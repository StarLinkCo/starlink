// client
Meteor.subscribe("userData");
Meteor.subscribe("tags");
//Meteor.subscribe("groups");
Meteor.subscribe("notifications");

Accounts.onLogin(function(data) {
  Meteor.call('increaseLogin', function(err, result) {
    Session.set('firstTimeSignup', false);
    if (result == 1) {
      joinStarLinkGroup();
      Session.set('firstTimeSignup', true);
    }
  });
});
