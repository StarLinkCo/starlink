handle = {}

Template.groupChat.helpers
  id: ->
    _id: @_id
  members: ->
    @members
  currentUserName: ->
    Meteor.user().profile.firstName
  messages: ->
    Messages.find {groupId: @_id},
      sort:
        created: 1

Template.groupChat.events
  'keyup #messageBox': (event) ->
    if (event.type == "keyup" && event.which == 13)
      newMessage = Template.instance().$("#messageBox")

      if newMessage
        userName = Meteor.user().profile.firstName
        avatar = Meteor.user().profile.pictureUrl

      Messages.insert
        groupId: @_id
        name: userName
        userId: Meteor.userId()
        message: newMessage.val()
        created: new Date()
        avatar: avatar

      newMessage.val("")
      newMessage.focus()

      # Make sure new chat messages are visible
      $(".content").scrollTop 9999999
  'click .member-link': (event)->
    group = Router.current().data()
    users = Meteor.users.find({_id: { $in: _.map(group.members, (m)-> m.id)}}).fetch()
    userIds = _.map(users, (u)->u._id)
    initialIndex = _.indexOf(userIds, this.userId)
    Session.set('ion-slide-initial-slide', initialIndex)
    IonModal.open('_groupMembers', { users: users, group: Router.current().data() })

Template.groupChat.created = ->
  handle.instance = Meteor.subscribeWithPagination('groupMessages', this.data._id, 20)

Template.groupChat.rendered = ->
  $('.group-chat-wrapper').scroll(->
    if ($(this).scrollTop() == 0)
      handle.instance.loadNextPage()
  )
  setTimeout(->
    $('.group-chat-wrapper').scrollTop(99999)
  , 800)
