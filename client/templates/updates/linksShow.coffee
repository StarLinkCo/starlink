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
    e.target.commentContent.value = ''
