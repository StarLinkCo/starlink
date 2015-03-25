/**
 * Created by yangwang on 3/14/15.
 */
// Fixture data
if (Organizers.find().count() === 0) {

    Organizers.insert({
        name: 'SVIEF',
        organizer_id: "4302207107",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'TIPark Silicon Valley',
        organizer_id: "5628397911",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'JayWSalon',
        organizer_id: "6428799777",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'SVACE',
        organizer_id: "7462438955",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'AngelsGlobal',
        organizer_id: "7684502595",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'HYSTA',
        organizer_id: "7768017133",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'SV Cafe',
        organizer_id: "7905018476",
        source: 'eventbrite'
    });
}

if (Organizers.find({source: 'meetup'}).count() == 0) {

  Organizers.insert({
    groupurlname: 'sventrepreneurs',
    source: 'meetup'
  });

}

/*

{
    "_id" : ObjectId("55052f9d6a4c3c3694035a18"),
    "name" : "Yong",
    "flag" : "active",
    "organizer_id" : "6579662475"
}

{
    "_id" : ObjectId("5505328c6a4c3c3694035a19"),
    "name" : "Founders Space",
    "flag" : "active",
    "organizer_id" : "5321844957"
}

{
    "_id" : ObjectId("550692d36a4c3c3694035a1a"),
    "name" : "SVACE",
    "flag" : "active",
    "organizer_id" : "7862062877"
}

{
    "_id" : ObjectId("5506fa156a4c3c3694035a1b"),
    "name" : "Association of Chinese Entrepreneurs at Berkeley",
    "flag" : "active",
    "organizer_id" : "7919824397"
}

{
    "_id" : ObjectId("55073860064405d02deecabc"),
    "name" : "华人事业互助会 Bay Area Chapter",
    "flag" : "active",
    "organizer_id" : "7684661701"
}

{
    "_id" : ObjectId("550b7aa62f67244c68d541c8"),
    "name" : "The Startup Conference",
    "flag" : "active",
    "organizer_id" : "480256426"
}

{
    "_id" : ObjectId("550b7aa62f67244c68d541c9"),
    "name" : "Angel Launch",
    "flag" : "active",
    "organizer_id" : "582594815"
}

{
    "_id" : ObjectId("550b7aa62f67244c68d541ca"),
    "name" : "Silicon Valley Chinese Technology & Business Association",
    "flag" : "active",
    "organizer_id" : "8012673825"
}

{
    "_id" : ObjectId("550b7aa62f67244c68d541cb"),
    "name" : "Startup & Tech Mixer, Inc.",
    "flag" : "active",
    "organizer_id" : "6016680999"
}

{
    "_id" : ObjectId("550b7aa62f67244c68d541cc"),
    "name" : "Startup Socials",
    "flag" : "active",
    "organizer_id" : "3922719157"
}

{
    "_id" : ObjectId("550b7aa62f67244c68d541cd"),
    "name" : "UP Global",
    "flag" : "active",
    "organizer_id" : "2300226659"
}
*/