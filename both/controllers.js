AppController = RouteController.extend({
  layoutTemplate: 'layout'
});

GroupsShowController = AppController.extend({
  waitOn: function () {
    return ;//Meteor.subscribe('group', this.params._id);
  },
  data: function () {
    console.log("data returned");
    return {
      group: Groups.findOne({_id: this.params._id})
    }
  }
});

EventsShowController = AppController.extend({
  data: function () {
    return {
      event: Events.findOne({_id: this.params._id})
    }
  }
})
