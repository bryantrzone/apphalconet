cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "call-number.CallNumber",
        "file": "plugins/call-number/www/CallNumber.js",
        "pluginId": "call-number",
        "clobbers": [
            "call"
        ]
    },
    {
        "id": "com.teamnemitoff.phonedialer.phonedialer",
        "file": "plugins/com.teamnemitoff.phonedialer/www/dialer.js",
        "pluginId": "com.teamnemitoff.phonedialer",
        "merges": [
            "phonedialer"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "id": "cordova-plugin-email-composer.EmailComposer",
        "file": "plugins/cordova-plugin-email-composer/www/email_composer.js",
        "pluginId": "cordova-plugin-email-composer",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "call-number": "0.0.2",
    "com.teamnemitoff.phonedialer": "0.3.1",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-device": "1.1.4-dev",
    "cordova-plugin-dialogs": "1.3.1-dev",
    "cordova-plugin-geolocation": "2.4.1-dev",
    "cordova-plugin-network-information": "1.3.1-dev",
    "cordova-plugin-vibration": "2.1.3-dev",
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-email-composer": "0.8.15"
};
// BOTTOM OF METADATA
});