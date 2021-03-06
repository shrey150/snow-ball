import { MapPopoverComponent } from './../map-popover/map-popover.component';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { ModalController } from '@ionic/angular';

import * as firebase from 'firebase';

declare var google;

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {

  @ViewChild('map') mapElement: ElementRef;
  db: firebase.database.Database;

  map: any;
  heatmap: any;
  markers: Array<any>;
  dataPoints: Array<any>;
  markerImgs: Array<string>;
  selectorMarker: any;

  // set up variables
  constructor (private geolocation: Geolocation, public modalController: ModalController) {
    this.loadMap();
    this.db = firebase.database();
    this.markers = [];
  }

  // make all markers visible
  showMarkers() {
    this.markers.forEach(el => el.setVisible(true));
  }

  // make all markers invisible
  hideMarkers() {
    this.markers.forEach(el => el.setVisible(false));
  }

  // for each marker, remove from map
  // clear the marker array
  clearMarkers() {
    this.markers.forEach(el => el.setMap(null));
    this.markers = [];
  }

  loadHeatmap() {

    // set up heatmap for frequency of markers
    this.heatmap = new google.maps.visualization.HeatmapLayer({

      // this gets the LatLng objects needed
      // to represent points on a heatmap
      data: this.markers.map(x => x.getPosition()),
      map: null,
      radius: 50

    });

  }

  toggleHeatmap() {

    // if heatmap is currently visible,
    // show the markers in preparation
    // (since this means the heatmap
    // will be toggled to not visible)
    if (this.heatmap.getMap()) this.showMarkers();
    else                       this.hideMarkers();

    // if the heatmap is already visible, hide it
    // if it isn't visible, display it on the screen
    this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
  }

  // converts crude report messages to end-user text
  // eg. "snowing_yes" => "Started snowing"
  prettyPrintReport(str: string) {

    switch (str) {
      case "snowing_yes": return "Started snowing";
      case "snowing_no":  return "Stopped snowing";
      case "icy_roads":   return "Icy/slippery roads";
      case "plow_no":     return "Roads not plowed";
      case "plow_yes":    return "Roads plowed";
    }

  }

  loadMap() {

    // get GPS data, then create the map
    this.geolocation.getCurrentPosition().then(pos => {

      // create coordinates for GPS's current location
      const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      // setting up map data
      const mapOptions = {
        center: latLng,
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // create the map
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    })
    .then(() => {

      // when Firebase updates, update the map
      this.db.ref('/markers').on('value', snapshot => {

        // clear markers on the map
        this.clearMarkers();

        snapshot.forEach(childSnapshot => {

          // get marker data from Firebase
          const data = childSnapshot.val();
          const latLng = { lat: data.lat, lng: data.long };

          // create custom icon for the marker
          const image = {
            url: `assets/marker_icons/${data.type}.png`,
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 16)
          };

          // create the marker
          const marker = new google.maps.Marker({
            position: latLng,
            title: data.type,
            map: this.map,
            icon: image
          });

          // when you click a report marker,
          // open info about the report
          marker.addListener('click', async e => {

            // create popup window
            var modal = await this.modalController.create({
              component: MapPopoverComponent,
              componentProps: {
                img: data.img,
                type: this.prettyPrintReport(data.type),
                info: data.info,
                time: data.time,
                close: modal
              },
            });

            // show popup
            return await modal.present();

          });

          // add newly created marker to an array
          // this will make clearing all markers easier
          this.markers.push(marker);

        });

        // load the heatmap after updating markers
        this.loadHeatmap();

      });

    });

  }

}
