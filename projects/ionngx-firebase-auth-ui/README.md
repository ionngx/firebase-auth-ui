# Ionic-Angular Firebase Authentication

This library provides UI components for integrating an Ionin-Angular application with Firebase Authentication.

It provides the following set of components, which will be detailed below:

* IonngxFirebaseAuthUi
* IonngxFirebaseAuthAvatar

## Installation
This library relies on Angular Fire for accessing Firebase Authentication and we assume you will be using it to access other Firebase features such as Firestore so we declare a peer dependecy on @angular/fire rather than including it in the project. Follow the [Angular Fire Getting Started Guide](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md) to setup your app.

Once your application is prepared for Angular Fire install this library using npm or yarn with one of the following commands:

```bash
npm install @ionngx/firebase-auth-ui
```
or

```bash
yarn add @ionngx/firebase-auth-ui
```

## Configuration
Before using any of the components you will need to import and configure the **IonngxFirebaseAuthModule**.  First in *app.module.ts* or similar module where you are handing global initialisation, import the module.

```ts
import { IonngxFirebaseAuthModule } from '@ionngx/firebase-auth-ui';
```

Next you will need to initialise the module with your Firebase app configuration and some library specific settings.  We recommend storing these settings in Angular environments, where you can have different accounts or settings for each environment e.g development and production.  However you are free to use inline configuration.

We typically use the following *environment.ts*.  We have removed some identifiers, but of course realise you can get them from the source repo if so inclined. The *firebaseConfig* settings were added as we setup the app for Angular Fire, (you have done this right?).  We have added *appName* and *IonngxFirebaseAuthConfig* the latter matches the defaults used if you don't override them.

```ts
// environment.ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: '...',
    authDomain: 'ionngx-firebase-auth-ui.firebaseapp.com',
    databaseURL: 'https://ionngx-firebase-auth-ui.firebaseio.com',
    projectId: 'ionngx-firebase-auth-ui',
    storageBucket: 'ionngx-firebase-auth-ui.appspot.com',
    messagingSenderId: '...',
    appId: '...'
  },
  appName: 'Firebase Auth with Ionic & Angular - Dev',
  ionngxFirebaseAuthConfig: {
    enableFirestoreSync: true,
    guardFallbackRoute: '/',
    signInSuccessRoute: '/',
    guardProtectedRoutesUntilEmailIsVerified: true,
    passwordMaxLength: 60,
    passwordMinLength: 8,
    requireEmailVerification: true,
    showToastMessageOnAuthenticationSuccess: true,
    showToastMessageOnAuthenticationFailure: true
  }
}
```

So in our *app.module.ts* we can initialise the *IonngxFirebaseAuthModule* like this

```ts
// app.module.ts

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonngxFirebaseAuthModule.forRoot(environment.firebaseConfig, () => environment.appName, environment.IonngxFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


## Usage
With the components in this library you can take an all in one approach with the **IonngxFirebaseAuthUi** or you can provide separate pages for Sign In, Register and Account Managment using other components. In either case you will probably want to incorporate the **IonngxFirebaseAuthAvatar** into a header or navigation panel as a status indicator.  In this section we will look at each component briefly, we encourage you to look deeper into each component via the [Demo](https://ionngx-firebase-auth-ui.firebaseio.com) or API Documentation.



