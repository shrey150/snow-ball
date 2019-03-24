import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Component } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  db: any;
  reportType: any;

  constructor(private geolocation: Geolocation, private camera: Camera) {
    this.db = firebase.database();
  }

  takePicture(): void {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(imageData => {
     // const base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(imageData);
    }, err => console.log('error taking pic'));

  }

  sendReport(): void {

    this.geolocation.getCurrentPosition().then(pos => {

      this.db.ref('/markers').push({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
        type: this.reportType
      })
      .then(() => console.log('report sent'));

    });

  }

}
