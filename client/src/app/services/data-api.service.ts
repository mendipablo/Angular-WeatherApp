import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  constructor(private http: HttpClient) { }
  weather: Observable<any>;


  //obtiene el modelo en la DB de Entre Ríos
  getErModel() {
    const url_api = "http://localhost:3000/er";
    return this.http.get(url_api);
  }

  // idem de Córdoba
  getCbaModel() {
    const url_api = "http://localhost:3000/cba";
    return this.http.get(url_api);
  }

  //idem de Buenos Aires
  getBsasModel() {
    const url_api = "http://localhost:3000/bsas";
    return this.http.get(url_api);
  }

  //recibe una provincia como parámetro y obtiene el modelo
  getModel(pcia: string) {
    const url_api = `http://localhost:3000/${pcia}`;
    return this.http.get(url_api);
  }
  //recibe una provincia y su id como parámetro
  getModelId(pcia: string, id: string) {
    const url_api = `http://localhost:3000/${pcia}/${id}`;
    return this.http.get(url_api);
  }

  //guarda en la DB ciudad, clima y fecha de Entre Ríos
  saveWeatherEr(city: string, date: string, weather: Array<any>): Observable<any> {
    const url_api = "http://localhost:3000/er";
    return this.http.post(url_api, {city, date, weather})
      .pipe(map(data => data));
  }

  //Idem Córodoba
  saveWeatherCba(city: string, date: string, weather: Array<any>): Observable<any> {
    const url_api = "http://localhost:3000/cba";
    return this.http.post(url_api, {city, date, weather})
      .pipe(map(data => data));
  }

  //Idem Buenos Aires
  saveWeatherBsas(city: string, date: string, weather: Array<any>): Observable<any> {
    const url_api = "http://localhost:3000/bsas";
    return this.http.post(url_api, {city, date, weather})
      .pipe(map(data => data));
  }

}
