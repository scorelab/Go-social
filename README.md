# Go-social

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fbf9f8e1bb7b4d2cbb1ca569014ed45b)](https://app.codacy.com/app/shehand/Go-social?utm_source=github.com&utm_medium=referral&utm_content=shehand/Go-social&utm_campaign=Badge_Grade_Dashboard) [![Build Status](https://travis-ci.org/shehand/Go-social.svg?branch=master)](https://travis-ci.org/shehand/Go-social) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/scorelab/go-social)

Go-social is a customizable React Native app template designed for community-based mobile applications. The template provides a common foundation for building such applications, saving development time and allowing developers to focus on adding unique features and functionality specific to their community.

## Getting Started

To get started, you'll need to have the following software installed on your machine:

- [`Node.js`](https://nodejs.org/en/)
- [`React Native CLI`](https://reactnative.dev/docs/environment-setup)
- [`VSCode`](https://code.visualstudio.com/) and [`Android Studio`](https://developer.android.com/studio) (for Android development)
- [`Xcode`](https://developer.apple.com/xcode/) (for iOS development)

Once you have these installed, follow these steps:

1. Clone the repository to your machine:

   ```sh
   git clone https://github.com/scorelab/Go-social.git
   ```

2. Navigate to the project directory:

   ```sh
   cd Go-social
   ```

3. Install all dependencies:

   ```sh
   npm install
   # Or
   yarn install
   ```

Before using the app, you'll need to configure your app.

## Go-social app Configuration ~[IMPORTANT!]

To configure your app, follow these steps:

#### A. Firebase Setup:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project for the Go-social application. This is free for everyone. It's recommended to use the **Web App** instead of the Android or iOS app.

2. To enable `Authentication` and `Storage` for your app, activate them in the Firebase console `Build` section after creating and registering the app.
3. Enable `Sign-in methods` Email/Password and Facebook in the Authentication section of your Firebase app.
4. Create a `Firebase Realtime Database` and update its ruleset to allow read and write access.
5. Update the Firebase configuration object in `config/config.js` with app-specific config details obtained from the Firebase console app settings.

#### B. Google Maps Setup:

1. Generate a `Google Maps API Key` using this [Link](https://mapsplatform.google.com/) for G-social's map view, or use the provided key (not guaranteed to always work). Ensure the key has all maps, routes, and places enabled
2. After obtaining your Google Maps API key, replace the example key with your own.
   > - For Android open `android/app/src/main/AndroidManifest.xml` and replace

```sh
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="AIzaSyDmwJddIPTcALyZtj7p9mFFlkMvpMkati8"
/>
```

> - For IOS open `ios/Go_social/AppDelegate.m` and replace

```sh
[GMSServices provideAPIKey:@"AIzaSyDmwJddIPTcALyZtj7p9mFFlkMvpMkati8"];
```

#### C. Facebook Authentication Setup:

1. To enable `Facebook login` for Go-social, obtain a Facebook app id using the provided [link](https://developers.facebook.com/) and enable both email/password and Facebook sign-in method in Firebase.
2. After setting up Facebook authentication, use your Facebook App ID and App Secret to enable the "Facebook" `Sign-in method` in Firebase.
3. Update the following file in your repository: `Example app_id: 2349388348405699`
   > - For Android open `android/app/src/main/res/values/strings.xml` and replace

```sh
<string name=“facebook_app_id”>{YOUR_APP_ID}</string>
```

> - For iOS open `ios/Go_social/info.plist` and replace

```sh
...
<string>fb{YOUR_APP_ID}</string>
...
<key>FacebookAppID</key>
<string>{YOUR_APP_ID}</string>
<key>FacebookDisplayName</key>
<string>{YOUR_APP_NAME}</string>
...
```

### Run Go-social

Now you are ready to run Go-social
(for android)

```sh
npx react-native run-android
# Or
yarn react-native run-android
```

(for iOS)

```sh
npx react-native run-ios
# Or
yarn react-native run-ios
```

## Contributing

Contributions to this project are welcome! To contribute, follow our [Contribution Guidelines](https://github.com/scorelab/Go-social/blob/14e5dfcdfb59888efc318bb4835e3577d5d09532/.github/CONTRIBUTING.md)
