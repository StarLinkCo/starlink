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
        console.log ("redirect ok, now render other pages ", error);
      }
    });
  },

});


Template.groups.helpers({
  times: function () {
    var times = [];
    _(10).times(function(n){
      times.push(n);
    });
    return times;
  }
});

Template.calendar.helpers({
  tmplName: function () {
    return Session.get('tmplName');  
  }
});

Template.profile.helpers({
  tmplName: function () {
    return Session.get('tmplName');  
  },
  user: function () {
    var u = Meteor.user();
    console.log (u);
    return u;
  },
  getid: function  (url) {
    // body...
    //console.log(url);
    //var idRegex = /.*id=(\d+)&.*/;
   
    return url? url.match(/.*id=(\d+)&.*/)[1] : undefined;
  }
});

Template.groups.helpers({
  tmplName: function () {
    return Session.get('tmplName');  
  },
  groups: function () {
    /*
    var gs = [];
    gs.push({_id:1, name:'group1', count:100, desc:'No.1 group'});
    gs.push({_id:2, name:'group2', count:200, desc:'No.2 group'});
    gs.push({_id:3, name:'group3', count:300, desc:'No.3 group'});
    gs.push({_id:4, name:'group4', count:400, desc:'No.4 group'});
    gs.push({_id:5, name:'group5', count:500, desc:'No.5 group'});
    gs.push({_id:6, name:'group6', count:600, desc:'No.6 group'});
    gs.push({_id:7, name:'group7', count:700, desc:'No.7 group'});
    gs.push({_id:8, name:'group8', count:800, desc:'No.8 group'});
    gs.push({_id:9, name:'group9', count:900, desc:'No.9 group'});    
    console.log(gs);
    return gs;
    */
    return Groups.find();
  },
});

Template.groupsShow.helpers({
  members: function () {
    /*
    var members = [];
    _(this.count).times(function(n){
      members.push(n);
    });
    */
    console.log ('members is :', this._id);
    var members = Groups.findOne(this._id).members;
    return members;
  },
});

Template.updates.helpers({
  tmplName: function () {
    return Session.get('tmplName');  
  }
});

Template.groups.events({
  'click button': function (event, template) {
    console.log ("Join groups clicked!");
    console.log (this);
    var g = this;
    g.members.push({ id: Meteor.userId(), picture: Meteor.user().profile.pictureUrl });

    var modifies = {
      count: g.members.length,
      members: g.members,
    }

    Groups.update(this._id, {$set: modifies}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('groups');
      }
    });
  },
});