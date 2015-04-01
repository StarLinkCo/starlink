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
    return [Meteor.subscribe('groups', this.params._id), Meteor.subscribe('groupUsers', this.params._id)];
  },
  data: function() {
    return Groups.findOne({_id: this.params._id});
  }
};

Router.route('/groups/submit', {
  name: 'groups.submit'
});

Router.route('/groups/:_id',
  _.extend({name: 'group.show'}, groupFunc));

Router.route('/groups/:_id/chat', {
  name: 'group.chat',
  waitOn: function() {
    return [
      Meteor.subscribe('groups', this.params._id),
      Meteor.subscribe('groupUsers', this.params._id),
      Meteor.subscribe('groupMessages', this.params._id)
    ];
  },
  data: function() {
    return Groups.findOne({_id: this.params._id});
  }
})

Router.route('/events/:_id', {
  name: 'events.show'
});

Router.route('/links/submit', {
  name: 'links.submit'
});
Router.route('/links/:_id', {
  name: 'links.show',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  }
});
Router.route('/profile/:_id', {
  name: 'user.profile'
});

Router.route('/qa', {
  name: 'qa'
});

Router.route('/qa/submit', {
  name: 'qa.submit'
});

Router.route('/qa/:_id', {
  name: 'qa.show',
  waitOn: function() {
    return [Meteor.subscribe('singleQuestions', this.params._id), Meteor.subscribe('answers', this.params._id), Meteor.subscribe('qa_comments', this.params._id)];
  },
  data: function() {
    return Questions.findOne(this.params._id);
  }
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
  this.route('public_profile/:_id', {
    name: 'publicProfile',
    waitOn: function() {
      var subscriptions = [Meteor.subscribe('singleUser', this.params._id)];
      if(Meteor.userId() != null) {
        subscriptions.push(Meteor.subscribe('follows', { followingId: this.params._id, followerId: Meteor.userId() }));
        subscriptions.push(Meteor.subscribe('sharedGroups', this.params._id));
        subscriptions.push(Meteor.subscribe('sharedConnections', this.params._id));
        subscriptions.push(Meteor.subscribe('meetships', Meteor.userId()));
      }
      return subscriptions;
    },
    data: function() {
      var dataSet = {user: Meteor.users.findOne(this.params._id)};
      if (Meteor.userId() != this.params._id)
        dataSet.sharedGroups = Groups.find();//{'members.id': {$all: [Meteor.userId(), this.params._id]}});
      return dataSet;
    }
  });
  this.route('groups', {
    waitOn: function() {
      Meteor.subscribe('groups');
    }
  });
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
  this.route('userAccounts', {
    data: function() {
      return {};
    }
  });
  this.route('notifications');
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
