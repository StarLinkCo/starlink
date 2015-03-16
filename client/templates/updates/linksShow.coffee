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
      userEmail: getUserEmail(Meteor.user())
    })
    Links.update(this.link._id, { $inc: { commentsCount: 1 } })
    e.target.commentContent.value = ''
