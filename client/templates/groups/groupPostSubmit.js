AutoForm.addHooks(
  'groupForm',
  {
    before: {
      insert: function (doc) {
        doc.createdAt = Date.now();
        doc.count = 0;
        doc.createdById = Meteor.userId();
        var picture;
        if(Meteor.user().profile) {
          picture = Meteor.user().profile.pictureUrl;
        }
        doc.memebers = [
          { id: Meteor.userId(), picture: picture }
        ];
        return doc;
      }
    },
    onSuccess: function (operation, group, template) {
      Router.go('group.show', {_id: group});
    }
  }
);
