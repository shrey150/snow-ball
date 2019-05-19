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

  constructor(navParams: NavParams) {
    this.formattedTime = moment(navParams.data.time).fromNow();
  }

  closeModal() { this.modal.dismiss(); }

}
