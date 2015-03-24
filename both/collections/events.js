Events = new Mongo.Collection('events');

var setStartDate = function (doc) {
  if (doc.event_source == 'meetup') {
    doc.startDate = new Date(doc.time);
  } else {
    doc.startDate = new Date(doc.start_date);
  }
};

Events.before.insert(function (userId, doc) {
  setStartDate(doc);
});
Events.before.update(function (userId, doc) {
  setStartDate(doc);
});
