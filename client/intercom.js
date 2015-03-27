/**
 * Created by jwang on 3/26/15.
 */

Tracker.autorun(function () {
    IntercomSettings.userInfo = function (user, info) {
        //console.log(user);
        // add properties to the info object, for instance:
        if (user.profile) {
            info.email = user.profile.emailAddress;
            info.name = user.profile.firstName + ' ' + user.profile.lastName;
        }
    }
});
