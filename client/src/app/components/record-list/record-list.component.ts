import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataApiService} from 'src/app/services/data-api.service';
import {WeatherService} from 'src/app/services/weather.service';
import {DatePipe, Location} from "@angular/common";
import { CanvasJS } from 'src/assets/canvas/canvasjs.angular.component';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  constructor(private dataApi: DataApiService, private weatherService: WeatherService,
    private route: ActivatedRoute, public router: Router, public location: Location,public datepipe: DatePipe) { }

    model;
    weather;
    timeline;
    modelCity: any = [];
    page: number = 1;
    datapoints: any[] =  []
    windpoints: any[] =  []
    humiditypoints: any[] =  []
    chartOptions: any;
    filterShow = '';

  ngOnInit() {

    const cityName = this.route.snapshot.params["city"]
    const pcia = this.route.snapshot.params["pcia"]


    this.getReports(pcia, cityName);
    this.showWeatherDaily(cityName)


  }
  

   /**
      *Devuelve dirección del viento
      *
      * @param wind_deg Medida del viento en grados
      *
      *
      *
      * @returns El punto cardinal más aproximado
      */
      convertDegreeToCardinalPoint(wind_deg: number): string {

        const cardinalPoints = ["Norte", "Nornoreste", "Noreste", "Estenoreste",
          "Este", "Estesureste", "Sureste", "Sursureste",
          "Sur", "Sursuroeste", "Suroeste", "Oestesuroeste",
          "Oeste", "Oestenoroeste", "Noroeste", "Nornoroeste"];
        const rawPosition = Math.floor((wind_deg / 22.5) + 0.5);
        const arrayPosition = (rawPosition % 16);
        return (cardinalPoints[arrayPosition]);
    
      };
  

 
      
  showWeatherDaily(cityName: string) {
    let card = 0;
    let call = []
    this.timeline = [];
    this.weatherService.getWeather(cityName)
      .subscribe(
        res => {
          this.weather = res//,
          console.log(this.weather, 'hoooo')
          let coord = res['coord']
          this.weatherService.getOneCall(coord['lat'], coord['lon'])
            .subscribe(
              res2 => {
                call = res2['daily']
              
                for (let list of call) {

                  card = list['wind_deg']
  
                  list['wind_cardinal'] = this.convertDegreeToCardinalPoint(card);
                  this.timeline.push(list);

                }

              
              }
            )

        },
        err => this.router.navigate(['/error'])

      )


  }

  getReports(pcia: string, cityName: string) {
    this.dataApi.getModel(pcia)
      .subscribe(
        city => {
          this.model = city
          for (let cd of this.model) {
            if (cityName == cd['city']) {
              this.modelCity.push(cd)

            }
          }
          console.log(this.modelCity, 'MODELO')

        },

      )

  }


 

  temperatureChart(index:number){

    this.datapoints.length = 0;
    
    for(let hour of this.modelCity[index]['weather'][1]){
      this.datapoints.push({x: new Date(hour['dt'] *1000), y: hour['temp']})
    
    }

    console.log(this.datepipe.transform(this.datapoints[index]['x'], 'yyyy-MM-dd'));
    this.chartOptions = new CanvasJS.Chart("chartContainer"+index, {
    
      exportFileName: 'gráfico '+this.datepipe.transform(this.datapoints[index]['x'], 'yyyy-MM-dd'),
      exportEnabled: true,
      title: {
        text: "Estadísticas por hora",
        fontFamily: 'Roboto'
      },
      toolTip:{
        content:"{y}°C",
      },
      animationEnabled: true,
      axisY: [
      {
        title: "Temperatura",
        interval:1,
        labelFontSize: 12,
      },
    ],
      axisX:{
        title: "Hora",
        interval: 2,
        intervalType: "hour",
        labelFontSize: 12, 
      },
      data: [{
        color:'#ff8c00',
      type: "area", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}°C", //Shows y value on all Data Points
      axisXIndex: 0,
      dataPoints: this.datapoints
      }]
    } 
    ); 
    this.chartOptions.render();    
  }


  windChart(index:number){

    this.windpoints.length = 0;
    
    for(let hour of this.modelCity[index]['weather'][1]){

      this.windpoints.push({x: new Date(hour['dt'] *1000), y: hour['wind_speed'] *3.6})
    }

    console.log(this.datepipe.transform(this.windpoints[index]['x'], 'yyyy-MM-dd'));
    this.chartOptions = new CanvasJS.Chart("chartContainer"+index, {
    
      exportFileName: 'gráfico '+this.datepipe.transform(this.windpoints[index]['x'], 'yyyy-MM-dd'),
      exportEnabled: true,
      title: {
        text: "Estadísticas por hora",
        fontFamily: 'Roboto'
      },
      toolTip:{
        content:"{y}Km/H",
      },
      animationEnabled: true,
      axisY: [
      {
        title: "Velocidad",
        interval:1,
        labelFontSize: 12,
      },
    ],
      axisX:{
        title: "Hora",
        interval: 2,
        intervalType: "hour",
        labelFontSize: 12, 
      },
      data: [{
        color:'#415eff',
      type: "area", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}°C", //Shows y value on all Data Points
      axisXIndex: 0,
      dataPoints: this.windpoints
      }]
    } 
    ); 
    this.chartOptions.render();    
  }


  humidityChart(index:number){

    this.humiditypoints.length = 0;
    
    for(let hour of this.modelCity[index]['weather'][1]){

      this.humiditypoints.push({x: new Date(hour['dt'] *1000), y: hour['humidity'] })
    }

    console.log(this.datepipe.transform(this.humiditypoints[index]['x'], 'yyyy-MM-dd'));
    this.chartOptions = new CanvasJS.Chart("chartContainer"+index, {
    
      exportFileName: 'gráfico '+this.datepipe.transform(this.humiditypoints[index]['x'], 'yyyy-MM-dd'),
      exportEnabled: true,
      title: {
        text: "Estadísticas por hora",
        fontFamily: 'Roboto'
      },
      toolTip:{
        content:"{y}%",
      },
      animationEnabled: true,
      axisY: [
      {
        title: "Humedad",
        interval:1,
        labelFontSize: 12,
      },
    ],
      axisX:{
        title: "Hora",
        interval: 2,
        intervalType: "hour",
        labelFontSize: 12, 
      },
      data: [{
        color:'#4caf50',
      type: "area", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}°C", //Shows y value on all Data Points
      axisXIndex: 0,
      dataPoints: this.humiditypoints
      }]
    } 
    ); 
    this.chartOptions.render();    
  }

 
  public toggle(element: HTMLElement ,index: number) {
    
    const demo = document.querySelectorAll('.show')
    if(demo.length ){
      element.classList.replace('d-none', 'show')
      demo.forEach(e => {
        e.classList.replace('show', 'd-none')
      })
     
    }else{
      element.classList.replace('d-none', 'show')
      
    }

   this.temperatureChart(index);
    
   
  }





}
