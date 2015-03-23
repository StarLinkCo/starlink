Events = new Mongo.Collection('events');
Events.before.insert(function (userId, doc) {
  if (doc.event_source == 'meetup') {
    doc.startDate = new Date(doc.time);
  } else {
    doc.startDate = new Date(doc.start_date);
  }
});
