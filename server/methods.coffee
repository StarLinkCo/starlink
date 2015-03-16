Meteor.methods
  updateProfile: (doc, modifier, id) ->
    #Important server-side check for security and data integrity
    check(doc, Schema.profile)
    Meteor.users.update(id, {$set: {"profile.roles": doc.roles}})
    console.log(Meteor.users.findOne(id).profile.roles)

  extractInfoFromUrl: (url)->
    extractBase = 'http://api.embed.ly/1/extract'
    embedlyKey = 'c84fe2c1c3534e4a944ab27eea6eb077'
    try
      result = Meteor.http.get(extractBase, {
        params: {
          key: embedlyKey,
          url: url,
          image_width: 200
        }
      })

      return result
    catch error
      console.log(error)
      return null
