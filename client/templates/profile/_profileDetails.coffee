Handle = {}
Template._profileDetails.helpers
  skills: ->
    if @profile? and @profile.skills?
      _.map @profile.skills.values, (value) ->
        value.skill.name
    else
      []

  connections: ->
    if @profile?
      Meteor.linkedinConnections.find()
    else
      []

  isCurrentUserProfile: ->
    Meteor.userId() == this.user._id

Template._profileDetails.rendered = ->
  if this.data.profile?
    Handle.instance = Meteor.subscribeWithPagination('linkedin_connections', this.data.user._id, 20)

  $('.profile-wrapper').scroll(->
    if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
      Handle.instance.loadNextPage()
  )

Template._profileDetails.events
  'click .refresh-profile-button': (e)->
    e.preventDefault()
    $(e.target).attr("disabled", true)
    $(e.target).text("Refreshing Profile")
    Meteor.call('refreshProfile', (err, result)->
      console.log err
      if !err?
        $(e.target).text("Refreshed Profile")
    )
