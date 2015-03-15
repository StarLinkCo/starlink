AutoForm.hooks({
  linkForm: {
    onSuccess: function(operation, link, template) {
      Router.go('links.show', {_id: link});
    }
  }
});

