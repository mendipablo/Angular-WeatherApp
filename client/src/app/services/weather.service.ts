import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apikey: string = 'b6e904db5a65fb2b2489498ecc9fdb68';

  //uri tiempo y hora actual
  URI: string = '';

  //uri Tiempo extendido
  URI2: string = '';

  //uri para mandar alerta
  URI3: string = '';

  //uri para postear
  URI4: string = '';

  //uri geocoding API por ciudad
  URI5: string = '';

  //
  URI6: string = '';

  call;
  weather;
  weatherExtend;
  weatherData: any = [];


  constructor(private http: HttpClient) {

    this.URI = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apikey}&units=metric&lang=es&q=`;
    this.URI2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.apikey}&units=metric&lang=es&q=`;

    this.URI3 = `http://api.pushingbox.com/pushingbox?devid=v4DF84AC9D1C036A`;
    
    this.URI4 = `https://api.openweathermap.org/data/2.5/forecast/daily?appid=${this.apikey}&units=metric&cnt=1&lang=es&q=`;
    this.URI5 = `http://api.openweathermap.org/geo/1.0/direct?&limit=5&appid=${this.apikey}&q=`;




  }

  getWeatherByCoord(lat: string, lon: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&lat=${lat}&lon=${lon}&appid=${this.apikey}`)
  }

  //busca ciudad, obtiene todos los datos de 1 día

  getWeather(cityName: string) {
    return this.http.get(`${this.URI}${cityName}`)
      .pipe(
        catchError((err) => {
          console.log('Se capturo el error')

          console.error(err)

          return throwError(err);
        })
      )
  }


  //busca por latitud y longitud el clima de una ciudad a 8 días
  getOneCall(lat: string, lon: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&units=metric&lang=es&appid=${this.apikey}&lat=${lat}&lon=${lon}`);
  }
  /*
  getWeatherExtended(cityName: string){
    return this.http.get(`${this.URI2}${cityName}`);
  }*/

  // busqueda por 5 dias
  getWeatherExtended(cityName) {
    return this.http.get(`${this.URI2}${cityName}`);
  }

  // busqueda por hora
  getWeatherDay(cityName) {
    return this.http.get(`${this.URI4}${cityName}`);
  }

  sendAlert() {
    return this.http.get(`${this.URI3}`);
  }

  getGeoList(cityName) {
    return this.http.get(`${this.URI5}${cityName}`)
  }


}
