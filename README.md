# mobile app skeleton ionic4-vuejs

With the basics of vuejs so you are able to create mobile apps (hybrid apps)

# Requirements
 1. vue cli

 2. android studio


# Description

Good news 😍😍, the Ionic Framework team has released version 4.0.0,
it becomes independent you can use it with any framework you want (reactjs,vuejs...) or vanillajs.


# 1. Installation

install packages

```bash
npm install
```
I assume that you know vuejs so you can create change whatever you want in components. after that we need to wrap our vue app into mobile app. there is two options cordova or capacitor (built by ionic team) and we will stick with ionic stuffs.
 

# 2. install & initialise Capacitor

```bash
cd yourproject
npm install --save @capacitor/core @capacitor/cli
```

you should also initialise Capacitor in your project:

```bash
npx cap init

```
To enable Android builds for our Capacitor project

```bash
npx cap add android
```

Once the platform has been added, you should run:

```bash
npx cap open android
```
*This will open your native Android project in Android Studio.* 

# 4. Run on an Android Device

All you have to do is hit the play button on the top-right hand side of the screen.


# 5. Build a Signed APK

Build > Generate Signed APK

Once you complete this step, the application will begin building. Once it has finished you will be able to find your signed APK at:

```bash
yourproject/android/app/release/app-release.apk
```




