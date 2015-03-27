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

Template._profileDetails.rendered = ->
  if this.data.profile?
    Handle.instance = Meteor.subscribeWithPagination('linkedin_connections', this.data.user._id, 20)

  $('.profile-wrapper').scroll(->
    if ($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
      Handle.instance.loadNextPage()
  )
