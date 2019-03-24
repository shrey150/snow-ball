import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { SnowDayCalcComponent } from '../components/snow-day-calc/snow-day-calc.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
  ],
  declarations: [Tab2Page, SnowDayCalcComponent],
  providers: [
    Camera
  ]
})

export class Tab2PageModule {}
