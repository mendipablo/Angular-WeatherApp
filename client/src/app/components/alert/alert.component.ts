
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from 'src/app/services/helper.service';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  city;
  response;
  weatherExtend;
  weatherData: any = [];
  rain: any = [];
  thunder: any = [];

  constructor(private helper: HelperService, public router: Router) { }




  ngOnInit(): void {


    this.helper.customMessage.subscribe(msg => this.rain = msg);
    this.helper.customMessage1.subscribe(msg => this.thunder = msg);



  }






}
