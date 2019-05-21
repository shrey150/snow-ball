import { Component, ViewChild } from '@angular/core';
import { GoogleMapComponent } from '../components/google-map/google-map.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('map') map: GoogleMapComponent;

}
