Template.profileMetrics.helpers
  userMetric: ->
    userLinkedinId = Meteor.user().profile.id
    LinkedinMetrics.findOne({userLinkedinId: userLinkedinId})

  processingMetric: (metric)->
    metric.state == 'processing'

  failedMetric: (metric)->
    metric.state == 'failed'

  formatNumber: (num, f=1)->
    num.toFixed(f)

Template.profileMetrics.events
  'click #process-metrics-button': (e)->
    e.preventDefault()
    Meteor.call('startProcessMetrics', (error, result)->
    )
