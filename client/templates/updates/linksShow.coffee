Template.linksShow.events
  "submit .comment-form": (e)->
    e.preventDefault()
    content = e.target.commentContent.value
    user = Meteor.user()
    Comments.insert({
      linkId: this.link._id
      content: content
      createdAt: Date.now()
      userId: Meteor.userId()
      userName: getUserName(Meteor.user())
      userEmail: getUserEmail(Meteor.user())
    })
    Links.update(this.link._id, { $inc: { commentsCount: 1 } })
    e.target.commentContent.value = ''

  "click .upvote-button": (e)->
    e.preventDefault()
    if $(e.target).hasClass('disabled')
      return
    Meteor.call('upvoteLink', this._id)

Template.linksShow.helpers
  upvotedClass: ->
    userId = Meteor.userId()
    if userId && _.include(this.upvoters, userId)
      return 'disabled'
