Template._eventbriteShow.helpers

  formatEventbriteAddress: (venue)->
    components = [venue.address, venue.address_2, venue.city, venue.region, venue.postal_code]
    components = _.filter(components, (component)-> !_.isEmpty(component))
    components.join(", ")
