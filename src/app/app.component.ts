import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const app = firebase.initializeApp({
        apiKey: 'AIzaSyCp2x-7Befdb3Cq-2doUiSfbA5vs20fiDU',
        authDomain: 'snow-day-aggregator.firebaseapp.com',
        databaseURL: 'https://snow-day-aggregator.firebaseio.com',
        projectId: 'snow-day-aggregator',
        storageBucket: 'snow-day-aggregator.appspot.com',
        messagingSenderId: '505506222734'
      });
    });
  }
}
