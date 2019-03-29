import { WeatherDataComponent } from './../components/weather-data/weather-data.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { SnowDayCalcComponent } from '../components/snow-day-calc/snow-day-calc.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page, SnowDayCalcComponent, WeatherDataComponent]
})
export class Tab3PageModule {}
