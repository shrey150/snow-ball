import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Component } from '@angular/core';

import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  db: any;

  reportType: any;
  image: string;
  info: string;

  constructor(private geolocation: Geolocation, private camera: Camera, public toastController: ToastController, private base64: Base64) {
    this.db = firebase.database();
  }

  takePicture(): void {

      // set up camera options
      // picture quality, file type, etc
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      // take picture and save image data
      // (formatted as base64 string)
      this.camera.getPicture(options).then(imageData => {
       this.base64.encodeFile(imageData).then(file => this.image = file);
      }, err => this.image = '');

  }

  // display pop-up confirming report sent
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Report sent!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  // function called when "Report Conditions" clicked
  // sends report data to database and alerts success to user
  sendReport(): void {

    // get current location from GPS
    this.geolocation.getCurrentPosition().then(pos => {

      // send data to Firebase
      this.db.ref('/markers').push({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
        type: this.reportType,
        info: this.info ? this.info : '',
        img: this.image ? this.image : '',
        time: new Date().getTime()
      })
      .then(() => {

        // show alert "success" message
        this.presentToast();

        // clear form
        this.reportType = '';
        this.image = '';
        this.info = '';

      });

    });

  }

}
