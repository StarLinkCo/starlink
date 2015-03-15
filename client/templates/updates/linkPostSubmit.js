AutoForm.addHooks(
  'linkForm',
  {
    before: {
      insert: function (doc) {
        doc.userId = Meteor.userId();
        doc.userEmail = Meteor.user().emails[0].address;
        doc.createdAt = Date.now();
        return doc;
      }
    },
    onSuccess: function (operation, link, template) {
      Router.go('links.show', {_id: link});
    }
  }
);

