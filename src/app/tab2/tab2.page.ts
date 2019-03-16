import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, ViewChild, ElementRef } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // @ViewChild('reportType') reportType: ElementRef;
  db: any;
  reportType: any;

  constructor(private geolocation: Geolocation) {
    this.db = firebase.database();
  }

  sendReport(): void {

    this.geolocation.getCurrentPosition().then(pos => {

      this.db.ref("/markers").push({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
        type: this.reportType
      })
      .then(() => console.log("report sent"));

    });

  }

}
