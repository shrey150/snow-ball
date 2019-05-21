import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SnowData {
  chance?: number;
  updateTime?: string;
}

@Component({
  selector: 'snow-day-calc',
  templateUrl: './snow-day-calc.component.html',
  styleUrls: ['./snow-day-calc.component.scss'],
})

export class SnowDayCalcComponent {

  chance: string;
  message: string;

  constructor(public http: HttpClient) {
    this.fetchData();
    this.chance = '0';
   }

  fetchData() {
    // get snow day data from the API I wrote (hosted on Heroku)
    this.http.get('http://snowdaybot.herokuapp.com/api/calc?zipcode=19355').subscribe((res: SnowData) => {

      // if % chance of snow is negative, just make it 0%
      if (res.chance < 0) { res.chance = 0; }

      // display the snow day data on screen
      this.chance = String(res.chance);
      this.message = res.updateTime;
    });
  }

}
