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

      if newMessage && !_.isEmpty(newMessage.val())
        Meteor.call('sendGroupMessage', {groupId: @_id, content: newMessage.val()}, (err, result)->
          newMessage.val("")
          newMessage.focus()

          # Make sure new chat messages are visible
          $(".content").scrollTop 9999999
        )

  'click .member-link': (event)->
    group = Router.current().data()
    Router.go('group.members', { _id: group._id, _userId: this.userId})

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
