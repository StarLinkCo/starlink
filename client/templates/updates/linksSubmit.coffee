Template.linksSubmit.events
  "change input[name='url']": (e)->
    url = $(e.target).val()
    Meteor.call('extractInfoFromUrl', url, (error, result)->
      if result
        $titleField = $('[name="title"]')
        $bodyField = $('[name="body"]')
        $titleField.val(result.data.title)
        $bodyField.val(result.data.description)
        
    )
