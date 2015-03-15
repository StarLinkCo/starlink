/**
 * Created by jwang on 3/13/15.
 */

// https://github.com/percolatestudio/meteor-synced-cron
// http://bunkat.github.io/later/parsers.html
SyncedCron.add({
    name: 'Pull Eventbrite events to Event collection',
    schedule: function(parser) {
        //return parser.text('every 10 seconds');
        return parser.text('every 30 minutes');
        //return parser.text('at 5:00 am every 1 day');
    },

    job: function() {
        _.each(Organizers.find().fetch(), function(organizer) {
            //console.log(organizer.name);
            var events = EJSON.parse(Meteor.http.call(
                "GET",
                "https://www.eventbrite.com/json/organizer_list_events?id=" +
                organizer.organizer_id +
                "&app_key=" +
                Meteor.settings.eventbrite).content);
            _.each(events.events, function(event) {
                if (Events.find({id: event.event.id}).count() > 0 ||
                    // event exists already
                    // Status: Completed, Draft, Live, Canceled
                    event.event.status != "Live") {
                    return;
                }
                console.log(event.event);
                Events.insert(event.event);
            });
        });
    }
})

SyncedCron.start();


