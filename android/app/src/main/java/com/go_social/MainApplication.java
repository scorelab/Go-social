package com.go_social;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
// import com.oblador.vectoricons.VectorIconsPackage;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
// import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// import com.airbnb.android.react.maps.MapsPackage;
// import com.imagepicker.ImagePickerPackage;
// import com.facebook.CallbackManager;
// import com.facebook.FacebookSdk;
// import com.facebook.appevents.AppEventsLogger;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  // private static CallbackManager mCallbackManager =
  // CallbackManager.Factory.create();

  // protected static CallbackManager getCallbackManager() {
  // return mCallbackManager;
  // }

  private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for
      // example:
      // packages.add(new MyReactNativePackage());
      // packages.add(new ImagePickerPackage());
      // packages.add(new FBSDKPackage(mCallbackManager));
      // packages.add(new RNGestureHandlerPackage());
      // packages.add(new VectorIconsPackage());
      // packages.add(new MapsPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected boolean isNewArchEnabled() {
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }

    @Override
    protected Boolean isHermesEnabled() {
      return BuildConfig.IS_HERMES_ENABLED;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for
      // this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
