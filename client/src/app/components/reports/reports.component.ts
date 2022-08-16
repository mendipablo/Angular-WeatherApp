import {DatePipe, Location} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataApiService} from 'src/app/services/data-api.service';
import {WeatherService} from 'src/app/services/weather.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  model;
  cityNameEr;
  cityNameCba;
  cityNameBsas;
  er;
  cba;
  bsas

  constructor(private dataApi: DataApiService, private weatherService: WeatherService,
    private datePipe: DatePipe, public _router: Router, public _location: Location) { }

  ngOnInit() {

    this.getListEr();
    this.getListBsas();
    this.getListCba();


  }

  refresh(): void {
    this._router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);

    });

  }


  getListEr() {
    const cities = []
    this.dataApi.getErModel().subscribe(city => {
      this.er = city
      for (let cd of this.er) {
        cities.push(cd['city'])

      }
      this.cityNameEr = [...new Set(cities)]


    }
    )
  }
  getListBsas() {
    const cities = []
    this.dataApi.getBsasModel().subscribe(city => {
      this.bsas = city
      for (let cd of this.bsas) {
        cities.push(cd['city'])

      }
      this.cityNameBsas = [...new Set(cities)]


    }
    )
  }
  getListCba() {
    const cities = []
    this.dataApi.getCbaModel().subscribe(city => {
      this.cba = city
      for (let cd of this.cba) {
        cities.push(cd['city'])

      }
      this.cityNameCba = [...new Set(cities)]


    }
    )
  }

}
