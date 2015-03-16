Events = new Mongo.Collection('events');
Events.before.insert(function (userId, doc) {
  doc.startDate = new Date(doc.start_date);
});
