Template.ionBody.rendered = function () {
    IonSideMenu.snapper.settings({touchToDrag: true});
};

Template.ionBody.events({
  'click [data-ion-menu-close]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-homepage]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-homepage]': function (event, template) {
    Session.set('tmplName', "homepage");
    Router.go('/homepage');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-calendar]': function (event, template) {
    Session.set('tmplName', "calendar");
    Router.go('/calendar');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-profile]': function (event, template) {
    Session.set('tmplName', "profile");
    Router.go('/profile');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-groups]': function (event, template) {
    Session.set('tmplName', "groups");
    Router.go('/groups');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-updates]': function (event, template) {
    Session.set('tmplName', "updates");
    Router.go('/updates');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-qa]': function (event, template) {
    Session.set('tmplName', "qa");
    Router.go('/qa');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-logout]': function (event, template) {
    Session.set('tmplName', "logout");
    AccountsTemplates.logout();
    IonSideMenu.snapper.close();
  },
  'click [data-menu-notifications]': function(event) {
    IonSideMenu.snapper.close();
    Router.go('notifications');
  },
  'click [data-ion-menu-private-groups]': function(event) {
    IonSideMenu.snapper.close();
    Router.go('private_groups');
  }
});

Template.layout.helpers({
  notificationsCount: function() {
    return Notifications.find({read: false}).count();
  },
  hasNewMessage: function() {
    return Notifications.find({read: false}).count() > 0;
  }
});
