import {DatePipe, Location} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {HelperService} from 'src/app/services/helper.service';
import {WeatherService} from 'src/app/services/weather.service';


moment.locale("es");
@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'

})

export class NavbarComponent implements OnInit {
 
  constructor(private weatherService: WeatherService, private helper: HelperService,
    public router: Router, public location: Location
  ) {}


  pipe = new DatePipe('es-AR')
  message: any = [];
  message2: any = [];
  citiesRains;
  citiesThunder;
  response;
  weatherExtend;
  //weatherData: any = [];
  timeline: any = [];
  //weatherNow: any;
  compass = [];
  weather;
  //city;
  geo;
  //coord;
  cities = ['Concepción del Uruguay', 'Gualeguaychu', 'Villaguay', 'Paraná',
    'Baradero', 'Bahía Blanca', 'Carmen de Areco', 'Tres Arroyos',
    'Córdoba', 'Río Tercero', 'Río Cuarto', 'Marcos Juarez']

  ngOnInit() {

    this.getWeatherAlert(this.cities)

  }

  public toggle(element: HTMLElement) {
    element.classList.toggle('d-none');
  }



  changeMessage() {
    this.helper.changeMessage(this.citiesRains);
    this.helper.changeMessage1(this.citiesThunder);


  }
  passLocation() {
    this.helper.passLocation(this.weather);

  }
  passExtend() {
    this.helper.passExtended(this.timeline);

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


  cleanGeo() {
    this.geo = [];
  }

 
  refresh(): void {
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);

    });

  }




  //toma la lista de todas las ciudades
  //barre cada ciudad a 5 dias
  //y comprueba en cual existe posibilidad de tormenta

  /**
   * 
   * @param cities 
   * 
   * 
   */
  getWeatherAlert(cities: Array<any>) {

    const cityRain = []
    const cityThunder = []
    for (let cityName of cities) {
      this.weatherService.getWeatherExtended(cityName)
        .subscribe(
          res => {
            this.weatherExtend = res['list']
            //this.getWeatherData(this.weatherExtend)
            //console.log(this.weatherExtend, cityName, 'weather extend')
            for (let list of this.weatherExtend) {
              for (let listw of list['weather']) {
                if ((listw['main'] == 'Rain')) {

                  //console.log('si', cityName)
                  cityRain.push([cityName, list])

                  //this.weatherService.sendAlert()
                  //.subscribe(()=> console.log('Mensaje Enviado'))


                } if (listw['main'] == 'Thunderstorm') {
                  console.log('si', cityName)
                  cityThunder.push([cityName, list])
                  this.response = true
                }
              }
            }
            this.citiesRains = cityRain
            this.citiesThunder = cityThunder


            this.changeMessage()
          },
          err => console.log(err)
        )
    }
  }

  /**
   * 
   * @param cityName 
   * 
   * 
   */
  showGeo(cityName: string) {
    this.weatherService.getGeoList(cityName).subscribe(
      res => {
        this.geo = res
        //console.log(this.geo, 'geo')
        if (!this.geo.length) {
          this.showWeatherDaily(cityName)
          //this.showWeatherExtend(cityName)

          this.router.navigate(['/search']);

        }

      }
    )
  }
/**
 * 
 * @param lat 
 * 
 * @param lon 
 */
  getCoord(lat: string, lon: string) {
    this.geo = []

    this.weatherService.getWeatherByCoord(lat, lon)
      .subscribe(
        res => {
          //this.weather = []
          this.weather = res
          this.showWeatherDaily(this.weather['name'])
          //this.showWeatherExtend(this.weather['name'])



          this.router.navigate([`/search`]);
        }
      )



  }


  //busca el nombre de la ciudad, toma sus coordenas
  // y devuelve el clima a 8 dias
  /**
   * 
   * @param cityName 
   * 
   * 
   */
  showWeatherDaily(cityName: string) {
    let card = 0;
    this.timeline = [];
    let call = []
    localStorage.removeItem('weather')
    localStorage.removeItem('timeline')
    this.weatherService.getWeather(cityName)
      .subscribe(
        res => {
          //this.weather = []
          this.weather = res//,

          let coord = res['coord']

          console.log(this.weather, 'Array clima de la ciudad')
          this.weatherService.getOneCall(coord['lat'], coord['lon'])
            .subscribe(
              res2 => {
                call = res2['daily']
                this.weather['text'] = this.randomText(call['0'])
                for (let list of call) {

                  card = list['wind_deg']
                
                  list['wind_cardinal'] = this.convertDegreeToCardinalPoint(card);
                  this.timeline.push(list);

                }

                console.log(res2['daily'][0], '8 dias')
                this.passLocation()
                this.passExtend()
              }
            )

        },
        err => {

          window.location.reload();
          this.router.navigate([`/search`]);
          throw err;
        }
      )


  }


  /**
    getWeatherData(data: any) {
      this.weatherData = [];
      for (let i = 0; i < data.length; i = i + 8) {
        this.weatherData.push(data[i]);
      }
      console.log(this.weatherData, 'get weather data 2')
    }

   */

  

    /**
     * 
     * @param cityName 
     * 
     * 
     * 
     */
  showWeatherExtend(cityName: string) {
    let card = 0;
    let dateTime = 0;
    let aux = []
    this.compass = [];
    this.timeline = [];
    this.weatherService.getWeatherExtended(cityName)
      .subscribe(
        res => {
          this.weatherExtend = res['list']
          //this.getWeatherData(this.weatherExtend)
          //console.log(this.weatherExtend, 'weather extend')
          //this.getDailyForecast(this.weatherExtend)
          for (let list of this.weatherExtend) {

            card = list['wind']['deg']
            dateTime = list['dt_txt']



            list['wind']['cardinal'] = this.convertDegreeToCardinalPoint(card);
            this.timeline.push(list);

          }
          console.log('daily forecast ----', this.timeline)

          this.passExtend()

        },
        err => console.log(err)
      )

  }

  /*
  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + (start.getTimezoneOffset() / 60));
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return {start, to}
  }

  getDailyForecast(hour: any) {
    let card = 0;
    let dateTime = 0;
    let aux = []
    this.compass = [];
    this.timeline = [];
    for (let i = 0; i < hour.length; i += 8) {
      let forecast = hour.slice(i, i + 8);

      aux.push(
        forecast

      );
      const date = new Date(forecast.dt_txt).getTime();

      if (this.dateRange().start.getTime() <= date && this.dateRange().to.getTime() >= date) {
        this.weatherNow = forecast;
        console.log('daily forecast2 ----', this.weatherNow)
      }

    }

    for (let list of aux) {
      for (let listc of list) {
        card = listc['wind']['deg']
        dateTime = listc['dt_txt']



        listc['wind']['cardinal'] = this.convertDegreeToCardinalPoint(card);
        this.timeline.push(listc);
      }
    }
    console.log('daily forecast ----', this.timeline)

  }
*/


/**
 * 
 * @param cityName 
 * 
 * 
 * @returns {boolean}
 */

  submitLocation(cityName: HTMLInputElement) {

    if (cityName.value) {
      //this.showWeatherDaily(cityName.value);
      //this.showWeatherExtend(cityName.value);
      this.showGeo(cityName.value);


      cityName.value = "";

    } else {
      alert("Por favor, ingrese datos válidos.")
    }
    cityName.focus();

    return false
  }


/**
 * 
 * @param word 
 * 
 * 
 * @returns 
 */

  randomText(word: Array<any>) {
    let texts = []
    word['rainpop'] = word['pop']

    if (word['weather']['0']['main'] == 'Clear') {
      const clearDay = 'El día se presentará despejado, se espera una sensación térmica de ' + Math.round(word['feels_like']['day']) + ' °C' +
        ' con temperaturas matinales que rondan los ' + Math.round(word['temp']['morn']) +
        ' °C y por la tarde ' + Math.round(word['temp']['eve']) +
        ' °C con máximas de ' + Math.round(word['temp']['max']) + '°C y mínimas de ' + (word['temp']['min']) +
        ' °C. Durante la noche se esperan ' + Math.round(word['temp']['night']) +
        ' °C. <br /> Vientos del ' + this.convertDegreeToCardinalPoint(word['wind_deg']) +
        ' con ráfagas de ' + Math.round(word['wind_gust'] * 3.6) + ' Km/h' +
        ' y una probabilidad de precipitaciones del ' + Math.round(word['rainpop'] * 100) + '%.';

      texts.push(clearDay);
    }
    if (word['weather']['0']['main'] == 'Rain') {

      if (word['weather']['0']['id'] == 500) {

        var rainDay = 'Día inestable, con máximas de ' + Math.round(word['temp']['max']) + ' °C y mínima de ' +
        Math.round(word['temp']['min']) + ' °C. ' +
          ' Por la noche la temperatura se mantendrá en los ' + word['temp']['night'] + '°C. <br />' +
          ' Humedad del ' + word['humidity'] + '%, con probabilidad de precipitaciones (' + (Math.round(word['rainpop'] * 100)) + '%). <br />' +
          ' Vientos provenientes del ' + this.convertDegreeToCardinalPoint(word['wind_deg']) +
          ' con una velocidad media de ' + Math.round(word['wind_speed'] * 3.6) + 'Km/h y ráfagas de ' + Math.round(word['wind_gust'] * 3.6) + ' Km/h.';
      }

      else if ((word['weather']['0']['id'] == 501) ||
        (word['weather']['0']['id'] == 502)) {

        var rainDay = 'Se pronostican lluvias de variada intensidad. <br />' +
          'La temperatura máxima para el día de hoy será de unos ' + Math.round(word['temp']['max']) +
          ' °C y con una mínima de ' + Math.round(word['temp']['min']) + ' °C. <br />' +
          'En la última hora se registró un volumen de precipitación de ' + Math.round(word['rain']) + ' mm.  <br />' +
          'Ráfagas de ' + Math.round(word['wind_gust'] * 3.6) + ' Km/h provenientes del ' +
          this.convertDegreeToCardinalPoint(word['wind_deg']) + '.';
      } else {


        var rainDay = 'Ufffff';

      }



      texts.push(rainDay);

    }

    if (word['weather']['0']['main'] == 'Thunderstorm') {

      const stormDay = 'Refusila';

      texts.push(stormDay);

    }


    if (word['weather']['0']['main'] == 'Clouds') {

      if ((word['weather']['0']['id'] == 801) ||
        (word['weather']['0']['id'] == 802)) {

        var cloudyDay = 'Nubosidad variable, por la mañana se esperan temperaturas que ronden los ' + Math.round(word['temp']['morn']) +
          ' °C, por la tarde ' + Math.round(word['temp']['eve']) +
          ' °C con máximas de ' + Math.round(word['temp']['max']) + '°C y mínimas de ' + Math.round(word['temp']['min']) +
          ' °C y por la noche se esperan ' + Math.round(word['temp']['night']) + ' °C. <br /> ' +
          'Humedad del ' + word['humidity'] + '%, viento del ' + this.convertDegreeToCardinalPoint(word['wind_deg']) +
          ', que promedian los ' + Math.round(word['wind_speed'] * 3.6) + ' Km/h.';
      } else {
        var cloudyDay = 'Cielo cubierto para el día de hoy. <br />' +
          'Humedad del ' + word['humidity'] + '%, viento del ' + this.convertDegreeToCardinalPoint(word['wind_deg']) +
          ', ráfagas de ' + Math.round(word['wind_gust'] * 3.6) + ' Km/h. <br />' +
          ' Máximas y mínimas de ' + Math.round(word['temp']['max']) + '°C y ' + Math.round(word['temp']['min']) +
          ' °C respectivamente.';
      }


      texts.push(cloudyDay);

    }

    return texts
  }



}
