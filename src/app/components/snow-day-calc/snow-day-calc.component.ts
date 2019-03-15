import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'snow-day-calc',
  templateUrl: './snow-day-calc.component.html',
  styleUrls: ['./snow-day-calc.component.scss'],
})
export class SnowDayCalcComponent {

  constructor(public http: HttpClient) {
    this.fetchData();
   }

  fetchData() {
    this.http.get('http://localhost:3000/calc?zipcode=19355').subscribe(data => {
      console.log(data);
    });
  }

}
