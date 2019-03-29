import { Base64 } from '@ionic-native/base64/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
  ],
  declarations: [Tab2Page],
  providers: [
    Camera,
    Base64
  ]
})

export class Tab2PageModule {}
