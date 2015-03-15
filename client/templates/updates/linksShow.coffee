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
      userEmail: Meteor.user().emails[0].address
    })
    e.target.commentContent.value = ''
