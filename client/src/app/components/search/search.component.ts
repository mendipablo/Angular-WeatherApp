import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from 'src/app/services/helper.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  weather: any = [];
  timeline;


  constructor(private helper: HelperService, public router: Router) { }

  ngOnInit(): void {


    this.helper.customMessage2.subscribe(msg => {
      this.weather = msg

      if (msg != '') {
        localStorage.setItem('weather', JSON.stringify(this.weather))
      }


    });
    this.helper.customMessage3.subscribe(msg => {
      this.timeline = msg
      if (msg != '') {
        localStorage.setItem('timeline', JSON.stringify(this.timeline))
      }

    });

    var weather = localStorage.getItem('weather');
    var timeline = localStorage.getItem('timeline');
    this.weather = JSON.parse(weather)
    this.timeline = JSON.parse(timeline)




  }

  ngOnDestroy(): void {
    localStorage.removeItem('weather')
    localStorage.removeItem('timeline')


  }



}
