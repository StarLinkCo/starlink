// client
Meteor.subscribe("userData");
Meteor.subscribe("tags");
//Meteor.subscribe("groups");
Meteor.subscribe("notifications");

Accounts.onLogin(function(data) {
  Meteor.call('increaseLogin', function(err, result) {
    if (result == 1) {
      Router.go('/profile?edit=1');
    } else {
      Router.go('/calendar');
    }
  });
});
