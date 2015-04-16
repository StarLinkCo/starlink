AppController = RouteController.extend({
  layoutTemplate: 'layout'
});

GroupsShowController = AppController.extend({
  waitOn: function () {
    return ;//Meteor.subscribe('group', this.params._id);
  },
  data: function () {
    return {
      group: Groups.findOne({_id: this.params._id})
    }
  }
});
GroupsEditController = AppController.extend({
  waitOn: function () {
    return ;//Meteor.subscribe('group', this.params._id);
  },
  data: function () {
    return {
      group: Groups.findOne({_id: this.params._id})
    }
  }
});

EventsShowController = AppController.extend({
  waitOn: function () {
    var subs = [Meteor.subscribe('eventGroup', this.params._id)];
    subs.push(Meteor.subscribe('singleEvent', this.params._id));
    return subs;
  },
  data: function () {
    var event = Events.findOne(this.params._id), group;
    if(event && event.groupId) {
      group = Groups.findOne(event.groupId)
    } else {
      group = null;
    }
    return {
      event: event,
      group: group
    }
  }
});
LinksShowController = AppController.extend({
  data: function () {
    return {
      link: Links.findOne({_id: this.params._id}),
      comments: Comments.find({ linkId: this.params._id })
    }
  }
});
LinksSubmitController = AppController.extend({
  data: function () {
    return {
    }
  }
});
