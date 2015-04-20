AutoForm.addHooks(
  'linkForm',
  {
    before: {
      insert: function (doc) {
        doc.userId = Meteor.userId();
        doc.userEmail = getUserEmail(Meteor.user());
        doc.userName = getUserName(Meteor.user());
        doc.createdAt = (new Date());
        doc.commentsCount = 0;
        doc.votesCount = 0;

        result = Meteor.call('extractInfoFromUrl', doc.url);

        if (result != null) {
          doc.title = result.data.title;
          doc.body = result.data.description
          if (result.data.images.length > 0) {
            doc.thumbnail = result.data.images.url;
          }
        }

        return doc;
      }
    },
    onSuccess: function (operation, link, template) {
      Router.go('links.show', {_id: link});
    }
  }
);

