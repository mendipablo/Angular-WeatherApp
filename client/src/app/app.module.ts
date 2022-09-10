import {DatePipe, registerLocaleData} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import localeEs from '@angular/common/locales/es-AR';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

registerLocaleData(localeEs);

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AlertComponent} from './components/alert/alert.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {Http404Component} from './components/http404/http404.component';
import {MapComponent} from './components/map/map.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RecordListComponent} from './components/record-list/record-list.component';
import {SearchComponent} from './components/search/search.component';
//services

import {DataApiService} from './services/data-api.service';
import {HelperService} from './services/helper.service';


//externals
import {NgxPaginationModule} from 'ngx-pagination';
import * as CanvasJSAngularChart from '../assets/canvas/canvasjs.angular.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    Http404Component,
    RecordListComponent,
    MapComponent,
    AlertComponent,
    FooterComponent,
    SearchComponent,
    CanvasJSChart,
    FilterPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
    
   
   
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-AR'},

    DataApiService,
    DatePipe,
    HelperService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
