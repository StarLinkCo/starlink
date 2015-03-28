// Request LinkedIn credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
LinkedIn.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'linkedin'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle('linkedin', config, options);

  var scope = [];
  if (options && options.requestPermissions) {
      scope = options.requestPermissions.join('+');
  }

  var loginUrl =
        'https://www.linkedin.com/uas/oauth2/authorization' +
        '?response_type=code' + '&client_id=' + config.clientId +
        '&redirect_uri=' + encodeURIComponent(Meteor.absoluteUrl('_oauth/linkedin?close')) +
        '&scope=' + scope + '&state=' + OAuth._stateParam(loginStyle, credentialToken);

    //https://github.com/meteor/meteor/tree/devel/packages/oauth
    //https://github.com/meteor/meteor/blob/devel/packages/oauth/oauth_cordova.js
    //https://github.com/meteor/meteor/tree/devel/packages/oauth1
    //https://github.com/meteor/meteor/tree/devel/packages/oauth2
    OAuth.showPopup(
        loginUrl,
        _.bind(credentialRequestCompleteCallback, null, credentialToken)
    );
};

//https://meteor.hackpad.com/OAuth-redirect-flow-spec-PeziTcaNPDP
//https://meteor.hackpad.com/OAuth-redirect-flow-part-II-vswwUKP4vXe

/*
 function isWeiXin(){
 var ua = window.navigator.userAgent.toLowerCase();
 if(ua.match(/MicroMessenger/i) == 'micromessenger'){
 return true;
 }else{
 return false;
 }
 }
 */