//import { WeatherExtend } from './services/weatherExtend';
import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';

import {DataApiService} from 'src/app/services/data-api.service';
import {WeatherService} from 'src/app/services/weather.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   

    constructor(private dataApi: DataApiService, public weatherService: WeatherService,
        private datePipe: DatePipe) { }


    call;
    weather: any = [];
    city;
    er = ['Concepción del Uruguay', 'Gualeguaychu', 'Villaguay', 'Paraná']
    bsas = ['Baradero', 'Bahía Blanca', 'Carmen de Areco', 'Tres Arroyos']
    cba = ['Córdoba', 'Río Tercero', 'Río Cuarto', 'Marcos Juarez']





    ngOnInit() {
        this.postWeatherEr(this.er);
        this.postWeatherBsas(this.bsas);
        this.postWeatherCba(this.cba);


    }

    /**
     *Captura la fecha del sistema
     *
     * @returns Fecha actual formateada
     *
     *
     */
    nowDate() {
        var date = new Date();
        return this.datePipe.transform(date, 'dd/MM/yyyy');
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


    /**
     * Obtiene clima actual de Entre Ríos
     * @param cityName
     * @param date
     *
     *
     *
     */
    getDataEr(cityName: string, date: string) {
        let card = 0;
        let dateTime = 0;
        this.weatherService.getWeather(cityName)
        .subscribe(
          res => {
            this.weather = res//
            let coord = res['coord']

            this.weatherService.getOneCall(coord['lat'], coord['lon'])
              .subscribe(
                res2 => {
                  this.call = [res2['daily'][0], res2['hourly'].splice(0,24)]
                 
              
                  card = this.call[0]['wind_deg']
                   
                  this.call[0]['wind_cardinal'] = this.convertDegreeToCardinalPoint(card);  
                  this.dataApi.saveWeatherEr(cityName, date, this.call)
                  .subscribe(() => console.log('Agregado'))
                 
                }
              )
  
          },
          err => {
  

            throw err;
          }
        )

    
    }

    /**
     * Obtiene clima actual de Buenos Aires
     *
     * @param cityName
     * @param date
     */

    getDataBsas(cityName: string, date: string) {

        let card = 0;
        let dateTime = 0;
        this.weatherService.getWeather(cityName)
        .subscribe(
          res => {
            this.weather = res//
            let coord = res['coord']

            this.weatherService.getOneCall(coord['lat'], coord['lon'])
              .subscribe(
                res2 => {
                    this.call = [res2['daily'][0], res2['hourly'].splice(0,24)]

            
                    card = this.call[0]['wind_deg']
                   
                    this.call[0]['wind_cardinal'] = this.convertDegreeToCardinalPoint(card);  
                  this.dataApi.saveWeatherBsas(cityName, date, this.call)
                  .subscribe(() => console.log('Agregado'))
                 
                }
              )
  
          },
          err => {
  

            throw err;
          }
        )

    }

    /**
     * Obtiene clima actual de Córdoba
     *
     * @param cityName
     * @param date
     */
    getDataCba(cityName: string, date: string) {

        let card = 0;
       
        this.weatherService.getWeather(cityName)
        .subscribe(
          res => {
            this.weather = res//
            let coord = res['coord']

            this.weatherService.getOneCall(coord['lat'], coord['lon'])
              .subscribe(
                res2 => {
                    this.call = [res2['daily'][0], res2['hourly'].splice(0,24)]
                   
                    card = this.call[0]['wind_deg']
                   
                    this.call[0]['wind_cardinal'] = this.convertDegreeToCardinalPoint(card);   
  
                 
                  this.dataApi.saveWeatherCba(cityName, date, this.call)
                  .subscribe(() => console.log('Agregado'))
                 
                }
              )
  
          },
          err => {
  

            throw err;
          }
        )

    }


    //hace un post a la DB con el clima y fecha de entre rios
    //y comprueba que no se ingrese dos veces la misma fecha

    /**
     * 
     * @param cities 
     * 
     * 
     */
    postWeatherEr(cities: Array<any>) {
        const dates = []
        for (let cityName of cities) {


            const date = this.nowDate()
            this.dataApi.getErModel().subscribe(city => {
                this.city = city
                if (!this.city.length) {

                    this.getDataEr(cityName, date)
                } else {

                    for (let cd of this.city) {
                        dates.push(cd['date'])
                    }
                    //console.log('Fechas er', dates)
                    if (dates.includes(date)) {
                        //console.log('Post de er')
                    } else {
                        this.getDataEr(cityName, date)
                    }

                }
            }
            )

        }
    }


    postWeatherBsas(cities: Array<any>) {
        const dates = []
        for (let cityName of cities) {


            const date = this.nowDate()
            this.dataApi.getBsasModel().subscribe(city => {
                this.city = city
                if (!this.city.length) {

                    this.getDataBsas(cityName, date)
                } else {

                    for (let cd of this.city) {
                        dates.push(cd['date'])
                    }
                    //console.log('Fechas bsas',dates)
                    if (dates.includes(date)) {
                        //console.log('Post de bsas')
                    } else {
                        this.getDataBsas(cityName, date)
                    }



                }
            }
            )

        }
    }

    postWeatherCba(cities: Array<any>) {
        const dates = []
        for (let cityName of cities) {


            const date = this.nowDate()
            this.dataApi.getCbaModel().subscribe(city => {
                this.city = city
                if (!this.city.length) {

                    this.getDataCba(cityName, date)
                } else {

                    for (let cd of this.city) {
                        dates.push(cd['date'])
                    }
                    //console.log('Fechas cba', dates)
                    if (dates.includes(date)) {
                        //console.log('Post de cba')
                    } else {
                        this.getDataCba(cityName, date)
                    }



                }
            }
            )

        }
    }




}
