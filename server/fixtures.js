/**
 * Created by yangwang on 3/14/15.
 */
// Fixture data
if (Organizers.find().count() === 0) {

    Organizers.insert({
        name: 'SVIEF',
        organizer_id: "4302207107"
    });

    Organizers.insert({
        name: 'TIPark Silicon Valley',
        organizer_id: "5628397911"
    });

    Organizers.insert({
        name: 'JayWSalon',
        organizer_id: "6428799777"
    });

    Organizers.insert({
        name: 'SVACE',
        organizer_id: "7462438955"
    });

    Organizers.insert({
        name: 'AngelsGlobal',
        organizer_id: "7684502595"
    });

    Organizers.insert({
        name: 'HYSTA',
        organizer_id: "7768017133"
    });

    Organizers.insert({
        name: 'SV Cafe',
        organizer_id: "7905018476"
    });
}
