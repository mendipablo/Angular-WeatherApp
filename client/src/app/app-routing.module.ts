import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertComponent} from './components/alert/alert.component';
import {HomeComponent} from './components/home/home.component';
import {Http404Component} from './components/http404/http404.component';
import {MapComponent} from './components/map/map.component';
import {RecordListComponent} from './components/record-list/record-list.component';
import {ReportsComponent} from './components/reports/reports.component';
import {SearchComponent} from './components/search/search.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'map', component: MapComponent},
  {path: 'search', component: SearchComponent},
  {path: 'record/:pcia/:city', component: RecordListComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'error', component: Http404Component},
  {path: 'alert', component: AlertComponent},

  {
    path: '**', pathMatch: 'full',
    component: Http404Component
  }

];

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule,
    RouterModule.forRoot(routes, {

      // Restore the last scroll position
      scrollPositionRestoration: "enabled",




    }),]

})
export class AppRoutingModule { }
