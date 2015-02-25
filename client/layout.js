Template.ionBody.events({
  'click [data-ion-modal]': function (event, template) {
    var templateName = $(event.currentTarget).data('ion-modal');
    IonModal.open(templateName, $(event.currentTarget).data());
  },
  'click [data-ion-menu-close]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }
    console.log ("menu-close clicked!");
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-homepage]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }
    console.log ("menu-homepage clicked!");
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-homepage]': function (event, template) {
    console.log ("menu-homepage clicked!");
    Session.set('tmplName', "homepage");
    Router.go('/homepage');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-calendar]': function (event, template) {
    console.log ("menu-calendar clicked!");
    Session.set('tmplName', "calendar"); 
    Router.go('/calendar');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-profile]': function (event, template) {
    console.log ("menu-profile clicked!");
    Session.set('tmplName', "profile"); 
    Router.go('/profile');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-groups]': function (event, template) {
    console.log ("menu-groups clicked!");
    Session.set('tmplName', "groups"); 
    Router.go('/groups');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-updates]': function (event, template) {
    console.log ("menu-updates clicked!");
    Session.set('tmplName', "updates");
    Router.go('/updates');
    IonSideMenu.snapper.close();
  },
});