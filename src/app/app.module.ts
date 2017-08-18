import { LoadingService } from '../providers/util/loading.service';
import { AlertService } from '../providers/util/alert.service';
import { ToastService } from '../providers/util/toast.service';
import { AuthModule } from '../pages/auth/auth.module';
import { CheckCoinsFirebaseData } from '../providers/checkcoins-firebase-data';
import { CheckCoinsData } from '../providers/checkcoins-data';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation'

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { Facebook } from '@ionic-native/facebook';

import { CacheService } from "ionic-cache/ionic-cache";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBB0pMjRqSXXCjoKGDOtAvhxEhlX5Ootmw",
  authDomain: "checkcoins-456cb.firebaseapp.com",
  databaseURL: "https://checkcoins-456cb.firebaseio.com",
  projectId: "checkcoins-456cb",
  storageBucket: "",
  messagingSenderId: "921377362627"
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

const appSettings = {
  tabsPlacement: 'bottom',
  backButtonText: '',
  backButtonIcon: 'ios-arrow-back',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  pageTransition: 'ios'
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    AuthModule,
    IonicModule.forRoot(MyApp, appSettings),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    CheckCoinsData,
    CheckCoinsFirebaseData,
    StatusBar,
    SplashScreen,
    ToastService,
    AlertService,
    LoadingService,
    Facebook,
    CacheService,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule {}
