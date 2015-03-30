/**
 * Created by jwang on 3/25/15.
 */

ServiceConfiguration.configurations.upsert(
    { service: "linkedin" },
    {
        $set: {
            clientId: Meteor.settings.linkedin_api,
            loginStyle: "redirect",
            secret: Meteor.settings.linkedin_secret
        }
    }
);
