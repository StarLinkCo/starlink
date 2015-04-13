UI.registerHelper('timeAgo', function(datetime) {
  Session.get('momentLocale'); // depend on session variable to reactively rerun the helper
  return moment(datetime).fromNow();
});
UI.registerHelper('getUserEmail', function(user) {
  return getUserEmail(user);
})
UI.registerHelper('getUserHeadline', function(user) {
  return getUserHeadline(user);
})
UI.registerHelper('getUserPicture', function(user) {
  return getUserPicture(user);
})

UI.registerHelper('getUserName', function(user) {
  return getUserName(user);
})

UI.registerHelper('isMeetupEvent', function(e) {
  return e.event_source == 'meetup';
})

UI.registerHelper('getGroupClass', function(group) {
  var _class = ['item-icon-left'];
  if (group.marked) {
    _class.push('marked-group');
  }
  return _class.join(' ');
})
