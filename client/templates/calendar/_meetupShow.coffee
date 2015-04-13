Template._meetupShow.helpers
  
    formatMeetupAddress: (venue)->
      components = [venue.address_1, venue.address_2, venue.city, venue.region, venue.postal_code]
      components = _.filter(components, (component)-> !_.isEmpty(component))
      components.join(", ")
