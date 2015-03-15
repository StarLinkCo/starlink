AutoForm.addHooks(
  'linkForm',
  {
    onSuccess: function (operation, link, template) {
      Router.go('links.show', {_id: link});
    },
    formToDoc: function (doc) {
      doc.userId = Meteor.userId();
      return doc;
    }
  }
);

