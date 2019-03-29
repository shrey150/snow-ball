import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Components } from '@ionic/core';

@Component({
  selector: 'map-popover',
  templateUrl: './map-popover.component.html',
  styleUrls: ['./map-popover.component.scss'],
})
export class MapPopoverComponent {

  @Input() img: string;
  @Input() type: string;
  @Input() info: string;

  @Input() modal: Components.IonModal;

  constructor() {
    //if (info.length === "") info = "No information given.";
  }

  closeModal() { this.modal.dismiss(); }

}
