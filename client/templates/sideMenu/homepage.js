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

Template.updates.helpers({
  tmplName: function () {
    return Session.get('tmplName');  
  }
});

Template.groups.events({
  'click button': function (event, template) {
    console.log ("Join groups clicked!");
  },
});