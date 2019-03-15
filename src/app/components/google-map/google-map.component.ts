import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor (private geolocation: Geolocation) {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then(pos => {

      const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    });

  }

}
