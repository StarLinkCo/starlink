tags = []
Template.qaSubmit.events
  "click .submit-button": ->
    content = $("input[name='content']").val()
    if !(_.isEmpty(content))
      Meteor.call("addQuestion", {content: content, tags: tags}, (err)->
        Router.go("qa")
      )

Template.qaSubmit.rendered = ->
  $(".tags-input").selectize(
    delimiter: ',',
    persist: false,
    items: ['ABC', "DEF"],
    create: (input)->
      value: input,
      text: input
    onItemAdd: (value, $item)->
      tags.push(value)
      console.log $item
    onItemRemove: (value)->
      _.remove(tags, (v)->v==value)
    onClear: (value)->
      tags = []
    onDelete: ->
      console.log 'delete'
  )
