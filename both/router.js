Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }
});

var groupFunc = {
  waitOn: function() {
    // add the subscription to the waitlist
    return this.subscribe('groups', this.params._id);
  },
  data: function() {
    return Groups.findOne({_id: this.params._id});
  }
};
Router.route('/groups/:_id', 
  _.extend({name: 'group.show'}, groupFunc));
Router.route('/groups/:_id/edit',
  _.extend({name: 'group.edit'}, groupFunc));

Router.route('/events/:_id', {
  name: 'events.show'
});

Router.route('/links/submit', {
  name: 'links.submit'
});
Router.route('/links/:_id', {
  name: 'links.show'
});
Router.route('/profile/:_id', {
  name: 'user.profile'
});
/*
Router.route('/', {
  name: 'profile'
});
*/

Router.route('/', function () {
  this.render('profile');
});

Router.map(function() {
//  this.route('index', {path: '/'});
//  this.route('homepage', {path: '/'});
  this.route('homepage');
  this.route('calendar');
  this.route('profile');
  this.route('groups');
  this.route('updates');
  this.route('actionSheet');
  this.route('backdrop');
  this.route('forms', {
    data: function () {
      return {
        post: Posts.find().fetch()[0]
      };
    }
  });
  this.route('headersFooters');
  this.route('lists');
  this.route('loading');
  this.route('modal');
  this.route('navigation');
  this.route('navigation.one', {path: '/navigation/one'});
  this.route('navigation.two', {path: '/navigation/two'});
  this.route('navigation.three', {path: '/navigation/three'});
  this.route('popover');
  this.route('popup');
  this.route('sideMenu');
  this.route('slideBox');
  this.route('tabs.one', {path: '/tabs/one', layoutTemplate: 'tabsLayout'});
  this.route('tabs.two', {path: '/tabs/two', layoutTemplate: 'tabsLayout'});
  this.route('tabs.three', {path: '/tabs/three', layoutTemplate: 'tabsLayout'});
  this.route('tabs.four', {path: '/tabs/four', layoutTemplate: 'tabsLayout'});
  this.route('userAccounts');
});

var requireLoginHook = function () {
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('userAccounts');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
};
Router.onBeforeAction(requireLoginHook, {
  only: ['links.submit']
});
