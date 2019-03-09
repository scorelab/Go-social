# Go-social
Community of today used to use mobile phones to make their life easier and community based mobile applications are famous among them. There are several kind of community based applications in use and most of them are relating to a specific domain. But core components have similar features. Address this issue and saving development time by introducing a common app template with customizable components for community based mobile applications, is the main purpose of this project.

## setup the project

#### **Installing reac-native in Windows**

##### *For macOS and Linux Use this* [link](https://facebook.github.io/react-native/docs/getting-started.html)

Note: Make sure that you have installed latest stable Nodejs (verison 8.3 or newer), Python2 and JDK (Java SE Development Kit - Version 8 or newer)
 
**Setup android studio with sdk**

[Download](https://developer.android.com/studio/index.html) and install Android Studio, Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:

* Android SDK
* Android SDK Platform
* Performance (Intel ® HAX)
* Android Virtual Device

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the `Android 9 (Pie)` SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

The SDK Manager can be accessed from the "Welcome to Android Studio" screen. Click on "Configure", then select "SDK Manager".

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the `Android 9 (Pie)` entry, then make sure the following items are checked:

* `Android SDK Platform 28`
* `Intel x86 Atom_64 Syste Image` or `Google APIs Intel x86 Atom System Image`

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 28.0.3 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

**Configure the ANDROID_HOME environment variable**

Open the System pane under System and Security in the Windows Control Panel, then click on Change settings.... Open the Advanced tab and click on Environment Variables.... Click on New... to create a new `ANDROID_HOME` user variable that points to the path to your Android SDK:

The SDK is installed, by default, at the following location:
```
c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
```

##### Add platform-tools to Path

Open the System pane under System and Security in the Windows Control Panel, then click on Change settings.... Open the Advanced tab and click on Environment Variables.... Select the Path variable, then click Edit. Click New and add the path to platform-tools to the list.

The default location for this folder is:
```
c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools
```

Then in your project directry opena a cmd and paste the following command in it.

`npm install -g react-native-cli`
>**Note** : If you are using a pyhsical device to run the native app, Make sure to do following steps also.
> 
> Run the following in a command prompt:
> 
> `$ adb -s <device name> reverse tcp:8081 tcp:8081`
> 
> To find the device name, run the following adb command:
> 
> `$ adb devices`

### Run Go-social

clone the project

`git clone https://github.com/scorelab/Go-social.git`

change the directory to the project folder

`cd Go-social`

install the node modules with following command

`npm install`

run the app 

`react-native run-android`