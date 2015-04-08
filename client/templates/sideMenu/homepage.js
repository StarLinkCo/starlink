Template.homepage.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  },


  'click [data-action=sign-in]': function (event, template) {
    //Meteor.loginWithMeteorDeveloperAccount({}, function (error) {
      Meteor.loginWithLinkedin({ loginStyle: "popup" }, function (error) {
      if (error) {
        alert(error);
        console.log ("redirect err ", error);
      } else {
        //IonModal.close();
        //UI.insert(UI.render(Template.signIn), document.body);
        Router.go('/profile');
      }
    });
  },

});


Template.calendar.helpers({
  tmplName: function () {
    return Session.get('tmplName');
  }
});



Template.updates.helpers({
  tmplName: function () {
    return Session.get('tmplName');
  }
});