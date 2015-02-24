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
  }
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