Template.PrivateGroups.helpers

  privateGroupName: (privateGroup)->
    members = privateGroup.members
    if members[0].id == Meteor.userId()
      members[1].userName
    else
      members[0].userName

  privateGroupImage: (privateGroup)->
    members = privateGroup.members
    if members[0].id == Meteor.userId()
      members[1].picture
    else
      members[0].picture
