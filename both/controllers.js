AppController = RouteController.extend({
  layoutTemplate: 'layout'
});

GroupsShowController = AppController.extend({
  waitOn: function () {
    return ;//Meteor.subscribe('group', this.params._id);
  },
  data: function () {
    console.log("data returned");
    var g = {_id: this.params._id, name:'group', count:this.params._id*100, desc:''};
    g.name += g._id;
    g.desc += 'We are No.' + g._id;
    return {group: g};
    /*
    return {
      group: Meteor.users.findOne({_id: this.params._id})
    }
    */
  }
});