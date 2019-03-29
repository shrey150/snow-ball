import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface WeatherData {
  name: string;
  main: any;
  weather: [{
    main: string;
    description: string;
    icon: string;
  }];
  wind: {
    speed: number;
  };
  snow: any;
}

@Component({
  selector: 'weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.scss'],
})
export class WeatherDataComponent {

  zipcode: number;
  appid: string;
  data: any;
  snow: string;
  temp: number;
  windSpeed: number;

  constructor(public http: HttpClient) {
    this.zipcode = 19355;
    this.appid = "629b95f43a04b13bd903462802159b40";
    this.fetchData();
  }

  fetchData() {
    this.http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${this.zipcode},us&appid=${this.appid}`).subscribe((res: WeatherData) => {
      this.data = res;
      this.snow = res.snow ? res.snow : "No snow fall expected.";

      // convert Kelvin -> Celsius -> Fahrenheit
      const cTemp = res.main.temp - 273.15;
      this.temp = Math.round((9 / 5) * cTemp + 32);

      // convert m/s -> mph
      this.windSpeed = Math.round(res.wind.speed * 2.23694);

      console.log(res);
    });
  }

}
