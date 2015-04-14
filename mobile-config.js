/**
 * Created by yangwang on 3/16/15.
 */
App.info({
    name: 'StarLink',
    description: 'Meet the right people at right events',
    version: '0.8.2',
    website: 'http://starlink.io',
    author: 'StarLink Co.'
});

App.icons({
    'android_ldpi': 'public/favicon-16x16.png',
    'android_mdpi': 'public/favicon-32x32.png',
    'android_hdpi': 'public/favicon-96x96.png',
    'android_xhdpi': 'public/android-chrome-192x192.png',
    'iphone': 'public/apple-touch-icon-57x57.png',
    'iphone_2x': 'public/apple-touch-icon-114x114.png',
    'iphone_3x': 'public/apple-touch-icon-180x180.png',
    'ipad': 'public/apple-touch-icon-72x72.png',
    'ipad_2x': 'public/apple-touch-icon-144x144.png'
});

App.accessRule("https://media.licdn.com", "true");
App.accessRule("http://schd.ws", "true");

