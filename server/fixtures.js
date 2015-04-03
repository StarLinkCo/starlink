/**
 * Created by yangwang on 3/14/15.
 */
// Fixture data
if (Organizers.find().count() === 0) {

    Organizers.insert({
        "name" : "F50",
        "organizer_id" : "4193708899",
        "flag" : "active",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'SVIEF',
        organizer_id: "4302207107",
        "flag" : "active",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'TIPark Silicon Valley',
        organizer_id: "5628397911",
        "flag" : "active",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'JayWSalon',
        organizer_id: "6428799777",
        "flag" : "active",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'SVACE',
        organizer_id: "7462438955",
        "flag" : "active",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'AngelsGlobal',
        organizer_id: "7684502595",
        "flag" : "active",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'HYSTA',
        organizer_id: "7768017133",
        "flag" : "active",
        source: 'eventbrite'
    });

    Organizers.insert({
        name: 'SV Cafe',
        organizer_id: "7905018476",
        "flag" : "active",
        source: 'eventbrite'
    });

    Organizers.insert({
        "name" : "Yong",
        "flag" : "active",
        source: 'eventbrite',
        "organizer_id" : "6579662475"
    });

    Organizers.insert({
        "name" : "Founders Space",
        "flag" : "active",
        source: 'eventbrite',
        "organizer_id" : "5321844957"
    });

    Organizers.insert({
        "name" : "SVACE",
        "flag" : "active",
        source: 'eventbrite',
        "organizer_id" : "7862062877"
    });


    Organizers.insert({
        "name": "Association of Chinese Entrepreneurs at Berkeley",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "7919824397"
    });

    Organizers.insert({
        "name": "华人事业互助会 Bay Area Chapter",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "7684661701"
    });

    Organizers.insert({
        "name": "The Startup Conference",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "480256426"
    });

    Organizers.insert({
        "name": "Angel Launch",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "582594815"
    });

    Organizers.insert({
        "name": "Silicon Valley Chinese Technology & Business Association",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "8012673825"
    });

    Organizers.insert({
        "name": "Startup & Tech Mixer, Inc.",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "6016680999"
    });

    Organizers.insert({
        "name": "Startup Socials",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "3922719157"
    });

    Organizers.insert({
        "name": "东湾创业群",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "7382144803"
    });

    Organizers.insert({
        "name": "Lifograph",
        "flag": "active",
        source: 'eventbrite',
        "organizer_id": "7861228074"
    });

    Organizers.insert({
        "name": "UP Global",
        "flag": "hold",
        source: 'eventbrite',
        "organizer_id": "2300226659"
    });
}

if (Organizers.find({source: 'meetup'}).count() == 0) {

    Organizers.insert({
        "name": "Silicon Valley Entrepreneurs & Startups",
        groupurlname: 'sventrepreneurs',
        "flag": "active",
        source: 'meetup'
    });
}
