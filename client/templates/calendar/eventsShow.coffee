Template.eventsShow.events
  "click .external-link": (e)->
    e.preventDefault()
    url = $(e.target).attr('href')
    window.open(url, '_blank', 'location=no')
