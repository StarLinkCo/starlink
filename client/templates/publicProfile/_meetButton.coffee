Template._meetButton.helpers
  hasMet: (user)->
    Meetships.find({$or: [{userId: user._id, meetUserId: Meteor.userId() }, {userId: Meteor.userId(), meetUserId: user._id}], connected: true}).count() > 0

  meetToAccept: (user)->
    Meetships.find({ userId: user._id, meetUserId: Meteor.userId(), connected: false}).count() > 0

  meetRequested: (user)->
    Meetships.find({ userId: Meteor.userId(), meetUserId: user._id, connected: false}).count() > 0

Template.publicProfile.events
  "click .meet-button": ->
    Meteor.call('meetUser', this.user._id)

  "click .accept-meet-button": ->
    Meteor.call('acceptMeet', this.user._id)

