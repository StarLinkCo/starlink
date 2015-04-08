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

  displayMessageTime: ->
    if !this.created?
      return null
    lastCreated = handle.lastCreated
    if !lastCreated?
      handle.lastCreated = this.created
      lastCreated = this.created
      return moment(this.created).format('llll')
    difference = Math.abs(lastCreated.getTime() - this.created.getTime())
    resultInMinutes = Math.round(difference / 60000)
    if resultInMinutes > 10
      handle.lastCreated =  this.created
      moment(this.created).format('llll')
    else
      null

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
  handle.instance = Meteor.subscribeWithPagination('groupMessages', Router.current().data()._id, 20)

Template.groupChat.rendered = ->
  $('.group-chat-wrapper').scroll(->
    if ($(this).scrollTop() == 0)
      handle.instance.loadNextPage()
  )
  setTimeout(->
    $('.group-chat-wrapper').scrollTop(99999)
  , 800)
