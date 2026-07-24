# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Hermes
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# SQLite
-keep class org.pgsqlite.** { *; }

# react-native-google-mobile-ads
-keep class com.google.android.gms.ads.** { *; }

# react-native-vector-icons
-keep class com.oblador.vectoricons.** { *; }

# react-native-sound-player
-keep class com.reactlibrary.** { *; }

# react-native-device-info
-keep class com.learnium.** { *; }

# react-native-webview
-keep class com.reactnativecommunity.webview.** { *; }

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }

# react-native-gesture-handler
-keep class com.swmansion.gesturehandler.** { *; }

# react-native-screens
-keep class com.swmansion.rnscreens.** { *; }

# react-native-safe-area-context
-keep class com.th3rdwave.safeareacontext.** { *; }

# react-native-paper
-keep class com.callstack.reactnativepaper.** { *; }

# react-native-render-html
-keep class com.officegroup.** { *; }

# Keep JS/Native interfaces
-keep class * implements com.facebook.react.bridge.NativeModule { *; }
-keep class * implements com.facebook.react.bridge.ReactContextBaseJavaModule { *; }
-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keep class * implements com.facebook.react.bridge.ModuleSpec { *; }

# Keep annotations
-keep @interface com.facebook.proguard.annotations.DoNotStrip
-keep @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.proguard.annotations.KeepGettersAndSetters class *

-keepclassmembers class * {
  @com.facebook.proguard.annotations.DoNotStrip *;
  @com.facebook.proguard.annotations.KeepGettersAndSetters *;
}

-keepclassmembers class * extends android.webkit.WebChromeClient {
    public void openFileChooser(...);
}

-dontwarn javax.annotation.**
-dontwarn com.facebook.react.**
-dontwarn com.oblador.vectoricons.**
