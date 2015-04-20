AutoForm.addHooks(
  'groupForm',
  {
    before: {
      insert: function (doc) {
        doc.createdAt = (new Date());
        doc.count = 0;
        doc.createdById = Meteor.userId();
        doc.memebers = [];
        doc.updatedAt = (new Date());
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
