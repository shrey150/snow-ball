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
   }

  fetchData() {
    this.http.get('http://localhost:3000/api/calc?zipcode=19355').subscribe((res: SnowData) => {
      console.log(res);
      if (res.chance < 0) { res.chance = 0; }
      this.chance = String(res.chance);
      this.message = res.updateTime;
    });
  }

}
