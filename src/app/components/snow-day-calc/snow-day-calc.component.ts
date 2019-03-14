import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'snow-day-calc',
  templateUrl: './snow-day-calc.component.html',
  styleUrls: ['./snow-day-calc.component.scss'],
})
export class SnowDayCalcComponent implements OnInit {

  constructor(public http: HttpClient) {
    this.fetchData();
   }

  fetchData() {
    console.log(this.http.get('http://www.snowdaycalculator.com/prediction.php?zipcode=19355'));
  }

  ngOnInit() {
    this.fetchData();
  }

}
