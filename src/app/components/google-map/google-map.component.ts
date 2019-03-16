import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as firebase from 'firebase';

declare var google;

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  db: firebase.database.Database;
  markers: Array<any>;
  markerImgs: Array<string>;

  constructor (private geolocation: Geolocation) {
    this.loadMap();
    this.db = firebase.database();
    this.markers = [];
  }

  clearMarkers() {
    this.markers.forEach(el => {
      el.setMap(null);
    });

    this.markers = [];
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then(pos => {

      const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      const mapOptions = {
        center: latLng,
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    })
    .then(() => {

      this.db.ref("/markers").on("value", snapshot => {

        this.clearMarkers();

        snapshot.forEach(childSnapshot => {

          const data = childSnapshot.val();
          const latLng = { lat: data.lat, lng: data.long };

          const image = {
            url: `assets/marker_icons/${data.type}.png`,
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 16)
          };

          const marker = new google.maps.Marker({
            position: latLng,
            title: data.type,
            icon: image
          });

          marker.setMap(this.map);
          this.markers.push(marker);

        });
      });

    });

  }

}
