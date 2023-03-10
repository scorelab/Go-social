# Go-social

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fbf9f8e1bb7b4d2cbb1ca569014ed45b)](https://app.codacy.com/app/shehand/Go-social?utm_source=github.com&utm_medium=referral&utm_content=shehand/Go-social&utm_campaign=Badge_Grade_Dashboard) [![Build Status](https://travis-ci.org/shehand/Go-social.svg?branch=master)](https://travis-ci.org/shehand/Go-social) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/scorelab/go-social)

Go-social is a customizable React Native app template designed for community-based mobile applications. The template provides a common foundation for building such applications, saving development time and allowing developers to focus on adding unique features and functionality specific to their community.

## Features

This app template includes the following features:

- Customizable components
- React Navigation v6
- Redux toolkit
- Firebase Authentication and Firestore
- Feed with posts and comments
- Social sharing and messaging functionality
- Notifications for new posts and comments
- Additional features such as easy theming will be implemented in the near future.

## Getting Started

To get started, you'll need to have the following software installed on your machine:

- `Node.js`
- `React Native CLI`
- `VSCode` and `Android Studio` (for Android development)
- `Xcode` (for iOS development)

Once you have these installed, follow these steps:

1. Clone the repository to your machine:

```sh
git clone https://github.com/yourusername/social-community-app-template.git
```

2. Navigate to the project directory:

```sh
cd social-community-app-template
npm install
```

Before using the app, you'll need to configure your app.

### Go-social app Configuration ~[IMPORTANT!]

To configure your app, follow these steps:

##### Firebase setup

**1.** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project for the Go-social application. This is free for everyone. It's recommended to use the **Web App** instead of the Android or iOS app.

> - Once the project is created, click the "Add app" button and select "web".
> - Follow the setup instructions provided by Firebase to register your app.
> - Once your app is registered, you will be provided with a `google-services.json`.
> - Place the configuration file in the root directory of your React Native project.
> - In `config/config.js`, replace the firebaseConfig object with your app's Firebase configuration:

```sh
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: '<YOUR_API_KEY>',
  authDomain: '<YOUR_AUTH_DOMAIN>',
  projectId: '<YOUR_PROJECT_ID>',
  storageBucket: '<YOUR_STORAGE_BUCKET>',
  messagingSenderId: '<YOUR_MESSAGING_SENDER_ID>',
  appId: '<YOUR_APP_ID>',
  measurementId: '<YOUR_MEASUREMENT_ID>',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
```

**2.** Create a Firebase Database and Update the Ruleset of the real-time database to Read/Write Allow:

> - Firstly, log in to your Firebase account and select the project in which you want to create a database.
> - Click on the "Database" tab in the left-hand sidebar of the Firebase console.
> - Click the "Create Database" button and select "Realtime Database" option.
> - Choose your preferred location and security settings, and then click "Done".
> - Once the database is created, click on the "Rules" tab in the console.
> - In the rules editor, locate the default ruleset which should be set to "read" and "write" to "false".
> - Change the default ruleset to allow read and write access by updating the ruleset to

```sh
{
  "read": true,
  "write": true
}
```

> - Save the changes you made to the ruleset.

##### Google Maps setup

To use Google Maps in the Go-social app, you'll need a Google Maps API key. Follow these steps to generate a new API key:

> - Go to the [Google Cloud Console](https://console.cloud.google.com/).
> - Click on the project dropdown menu at the top of the page and select "Create Project".
> - Enter a name for your project and click "Create".
> - Once your project is created, select it from the project dropdown menu.
> - In the navigation menu on the left, select "APIs & Services" > "Credentials".
> - Click the "+ CREATE CREDENTIALS" button and select "API key".
> - Copy the API key that is generated for you.
> - In the Go-social app, navigate to the `config/config.js` file and replace the GMAP_API_KEY_HERE placeholder with your API key.
> - Open `android/app/src/main/AndroidManifest.xml` and replace your Google map API key there.

```sh
<meta-data
android:name="com.google.android.geo.API_KEY"
android:value="AIzaSyDmwJddIPTcALyZtj7p9mFFlkMvpMkati8"/>
```

**Note:** that it's important to enable all maps, routes, and places in your API key to ensure that the Go-social app functions properly. While you can use the given API key provided in the app, it's not guaranteed to work indefinitely, so it's recommended to generate your own API key.

##### Facebook Authentication setup

To enable Facebook login in the Go-social app, you'll need to create a Facebook app ID and configure Firebase accordingly. Follow these steps to set up Facebook login:

> - Go to the [Facebook for Developers website](https://developers.facebook.com/) and create a new app.
> - Follow the setup instructions provided by Facebook to register your app and obtain a Facebook App ID.
> - In the Firebase Console, navigate to the "Authentication" section and enable the "Facebook" sign-in method.
> - Enter your Facebook App ID and App Secret in the Firebase Console.
> - Make sure to also enable the "Email/Password" sign-in method in Firebase.
> - In the `android/app/src/main/res/values/strings.xml` file, replace the facebookAppId value with your Facebook App ID:

```sh
<string name=“facebook_app_id”>2349388348405699</string>
```

Once Facebook login is set up, users can log in to the G-social app using their Facebook credentials. **Note** that users will also be able to create an account using their email and password if you've enabled the "Email/Password" sign-in method in Firebase.

Now you are ready to run Go-social.
(for android)

```sh
npx react-native run-android
```

(for iOS)

```sh
npx react-native run-ios
```

## Customizing the App

To customize the app for your organization, follow these steps:

1. Open the project in your preferred code editor
2. Replace the logo and colors in `src/constant/theme.js` with your organization's branding
3. Replace the firebaseConfig object in src/firebase.js with your own Firebase configuration
4. Modify the components in `src/screens` to fit your organization's needs
5. Add any additional features or components as needed

## Contributing

Contributions to this project are welcome! To contribute, follow these steps:
[Contribution Guidelines](https://github.com/scorelab/Go-social/blob/14e5dfcdfb59888efc318bb4835e3577d5d09532/.github/CONTRIBUTING.md)

1. Fork the repository to your own GitHub account
2. Clone the forked repository to your machine
3. Make your changes and commit them with descriptive commit messages
4. Push your changes to your forked repository
5. Open a pull request from your forked repository to the original repository
