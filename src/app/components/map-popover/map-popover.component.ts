import { Component, Input } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Components } from '@ionic/core';
import * as moment from 'moment';

@Component({
  selector: 'map-popover',
  templateUrl: './map-popover.component.html',
  styleUrls: ['./map-popover.component.scss'],
})
export class MapPopoverComponent {

  @Input() img: string;
  @Input() type: string;
  @Input() info: string;
  @Input() time: any;

  @Input() modal: Components.IonModal;

  formattedTime: string;
  relativeTime: string;

  constructor(navParams: NavParams) {

    // set up timestamps that are displayed on screen
    this.relativeTime = moment(navParams.data.time).fromNow();
    this.formattedTime = moment(navParams.data.time).calendar();
  }

  // close pop-up when "close" is clicked
  closeModal() { this.modal.dismiss(); }

}
