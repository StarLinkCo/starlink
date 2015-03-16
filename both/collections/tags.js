Tags.TagsMixin(Meteor.users);
Tags.TagsMixin(Posts);
Meteor.users.allowTags(function(){return true;});
