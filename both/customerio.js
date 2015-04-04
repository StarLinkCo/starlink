// initialization

var siteId = Meteor.settings.public.customerio.id;
var token = Meteor.settings.customerio.key; // only on the server
var cio = CustomerIo.init(siteId, token);

Accounts.onLogin(function(data) {
  cio.identify(data.user._id, data.user.profile.emailAddress,
    data.user.profile, function(err, res, body) {
      console.log(err);
      console.log(body);
  });
});