Template.publicProfile.events
  "click .summary-wrapper": ->
    $(".summary-wrapper").addClass('hide')
    $(".detail-wrapper").removeClass('hide')

  "click .follow-button": ->
    Meteor.call('followUser', this.user._id)

Template.publicProfile.helpers
  isNotCurrentUser: (user)->
    Meteor.userId() != user._id

  isFollowing: (user)->
    follow = Follows.findOne({followingId: user._id, followerId: Meteor.userId()})
    follow?
