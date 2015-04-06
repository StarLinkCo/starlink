selectizeOptions = (group="areas") ->
  valueField: 'name'
  labelField: 'name'
  dropdownParent: 'body'
  searchField: ['name']
  create: (input, cb) =>
    console.log('create tag: ', input)
    Meteor.users.addTag(input, group, {_id: Meteor.user()._id})
    tag = Meteor.tags.findOne({collection: "users", name: input, group: group})
    cb(tag) if cb?
    tag
  options: Meteor.tags.find({collection: "users", group: group}).fetch()
  items: Meteor.user()[group+"Tags"]
  render:
    item: (item, escape) ->
      '<div>' + (if item.name? then '<span class="name">' + escape(item.name) + '</span>' else '') + '</div>'
    option: (item, escape) ->
      name = item.name
      caption = item.nRefs
      '<div>' + '<span class="name">' + escape(name) + '</span>&nbsp;' + (if caption? then '<span class="badge">' + escape(caption) + '</span>' else '') + '</div>'
  onItemAdd: (value, $item) =>
    console.log('add tag: ', value)
    Meteor.users.addTag(value, group, {_id: Meteor.user()._id})
  onItemRemove: (value) =>
    console.log('remove tag: ', value)
    Meteor.users.removeTag(value, group, {_id: Meteor.user()._id})

Template.profileEdit.helpers
  profile: ->
    profile = Meteor.user().profile
    profile._id = Meteor.userId()
    profile
  profileFormSchema: ->
    Schema.profile
  interestsTags: ->
    Meteor.user().interestsTags
  interestsTagsOptions: ->
    Meteor.user().interestsTags.map (v) ->
      {label: v, value: v}
  areasTags: ->
    Meteor.user().areasTags
  interestsOptions: ->
    selectizeOptions("interests")
  areasOptions: ->
    selectizeOptions("areas")
  summary: ->
    Meteor.user().summary
  update: ->


AutoForm.hooks
  'profile-edit-form':
    onSuccess: (operation, result, template) ->
      IonModal.close()
    onError: (operation, error, template) ->
      alert(error)
