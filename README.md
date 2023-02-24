# Go-social

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fbf9f8e1bb7b4d2cbb1ca569014ed45b)](https://app.codacy.com/app/shehand/Go-social?utm_source=github.com&utm_medium=referral&utm_content=shehand/Go-social&utm_campaign=Badge_Grade_Dashboard)      [![Build Status](https://travis-ci.org/shehand/Go-social.svg?branch=master)](https://travis-ci.org/shehand/Go-social)  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)   [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/scorelab/go-social)

Today's community use mobile phones to make their life easier, and community-based mobile applications are famous among them. There are several kinds of community-based applications in use, and most of them relate to a specific domain. But core components have similar features. Addressing this issue and saving development time by introducing a common app template with customizable components for community-based mobile applications is the main purpose of this project.

## Setup the project

> NOTE: If you have not yet installed react-native, use [this link](https://facebook.github.io/react-native/docs/getting-started) to install and configure react-native. **Make sure to use react-native cli rather than using expo cli**.

## Contributing
Whether you are a community member or not, we would love your point of view! Feel free to first check out our
- [contribution guidelines](https://github.com/scorelab/Go-social/blob/14e5dfcdfb59888efc318bb4835e3577d5d09532/.github/CONTRIBUTING.md) 
- The guide outlines the process for **creating an issue** and **submitting a pull request.**

## Configure Go-social

*  Clone the project

    `git clone https://github.com/scorelab/Go-social.git`

*  Change the directory to the project folder

    `cd Go-social`

*  Install the node modules with the following command

    `npm install`
### Configure the config.example.js file (IMPORTANT)

> Open the project in any text editor you use. Open the `config.example.js` file in the `config` folder and follow the following steps.

*  Use [this link](https://console.firebase.google.com/) to **create a Firebase** project for the Go-social application. It is free for everyone. Please use the web app instead of the Android or iOS app.

*  Update the **Sign-in method** of Firebase [project](https://firebase.google.com/docs/auth/android/password-auth#before_you_begin) that you want to use as **Enabled**

*  Create a **Firebase Database** and Update the Ruleset of the real-time database to **Read/Write Allow**.

*  Use [this link](https://cloud.google.com/maps-platform/) to **generate Google Map Api key** for the map view in G-social. This is not necessary. You can use the given api key. But it is not guaranteed that the given key will always work. It is better to have your own key. Enable all maps, routes, places in your key.

*  Now you need a **Facebook app id** if you want to enable Facebook login for Go-social. Use [this link](https://developers.facebook.com/) for that and make sure to enable both email/password and Facebook sign-in method in Firebase.

So place your Firebase details and Google map API key in **config.example.js** file and **rename it** to **config.js**.

* To make Google map and Facebook login to work, you have to follow these extra steps.*

1.  Find the file name `AndroidManifest.xml` which is located in `android/app/src/main` path. Place your **Google map API key** in there.

    > Ex : <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value=**"AIzaSyDmwJddIPTcALyZtj7p9mFFlkMvpMkati8"**/>
        
1.  Find the file name as `strings.xml` located in  `android/app/src/main/res/values`. Place your **Facebook app id** in there.

    > Ex: <string name="facebook_app_id">**2349388348405699**</string>
        
So now you are ready to run Go-social.
## Run Go-social



*  Run the app 

    `npx react-native run-android`
    
    Then enable the remote Js debugging.

    
