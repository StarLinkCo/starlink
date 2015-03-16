Template.linksSubmit.events
  "change input[name='url']": (e)->
    url = $(e.target).val()
    IonLoading.show()
    Meteor.call('extractInfoFromUrl', url, (error, result)->
      IonLoading.hide()
      if result
        $titleField = $('[name="title"]')
        $bodyField = $('[name="body"]')
        $thumbnailField = $('[name="thumbnail"]')

        $titleField.val(result.data.title)
        $bodyField.val(result.data.description)

        thumbnailUrl = result.data.images[0]?.url
        if thumbnailUrl
          $thumbnailField.val(thumbnailUrl)
          $('.thumbnail-img').attr('src', thumbnailUrl)
    )
