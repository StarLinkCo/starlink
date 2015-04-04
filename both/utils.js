getUserEmail = function(user) {
  return user.profile ? user.profile.emailAddress : user.emails[0].address;
};

getUserName = function(user) {
  return user.profile ? (user.profile.firstName + " " + user.profile.lastName) : '';
};

getUserHeadline = function(user) {
  return user.profile ? user.profile.headline : '';
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
