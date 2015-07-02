getUserEmail = function(user) {
  return user.profile ? user.profile.emailAddress : user.emails[0].address;
};

getUserName = function(user) {
  return user.profile ? (user.profile.firstName + " " + user.profile.lastName) : '';
};

getUserHeadline = function(user) {
  return user.profile ? user.profile.headline : '';
};

getUserRoles = function(user) {
  return user.profile ? user.profile.roles : [];
};

getUserPicture = function(user) {
  return user.profile ? user.profile.pictureUrl : '';
};

getSkillsFromProfile = function(profile) {
  if(profile && profile.skills && profile.skills.values) {
    return _.map(profile.skills.values, function (value) { return value.skill.name });
  } else {
    return [];
  }
};

joinStarLinkGroup = function() {
  var pic = Meteor.user().profile && Meteor.user().profile.pictureUrl
  var group = Groups.findOne({name: 'Welcome to StarLink'});
  var member =  _.find(group.members,
    function(member) {return member.id == Meteor.userId()});
  if (!member) {
    Groups.update( {"_id": group._id }, {
      "$push": { "members" : {
        id: Meteor.userId(),
        picture: pic
      }},
      "$inc": {count: 1}});
  }
};
