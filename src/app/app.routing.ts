import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './services/canactivate.service';
import { ComponentsComponent } from './components/components.component';
import { DynamicBarchartComponent } from './components/dynamic-barchart/dynamic-barchart.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MainChartComponent } from './components/main-chart/main-chart.component';
import { AddTypeofimageComponent } from './components/add-typeofimage/add-typeofimage.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewInitiativeComponent } from './components/new-initiative/new-initiative.component';
import { NewMeasureComponent } from './components/new-measure/new-measure.component';
import { EditInitiativeComponent } from './components/edit-initiative/edit-initiative.component'
import { DashboardComponent} from './components/dashboard/dashboard.component'
import { ViewInitiativeComponent} from './components/view-initiative/view-initiative.component'
import {MeasureComponent} from './components/measure/measure.component'


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: "login"},
  {
    path:'login',component:LoginComponent,
  },{
    path:'home',component:HomeComponent
  },{
    path:'dashboard',component:DashboardComponent
  },{
    path:'initiative',component:NewInitiativeComponent
  },{
    path:'viewInitiative',component:ViewInitiativeComponent
  },{
    path:'measure',component:MeasureComponent
  },{
    path:'editInitiative',component:EditInitiativeComponent
  },{
    path:'newMeasure',component:NewMeasureComponent
  },{
    path: 'components', component: ComponentsComponent,
  children:[
    { path: '', redirectTo: 'layout', pathMatch: 'full' },
    { path: 'layout', component: LayoutComponent},
    { path: 'main-chart', component: MainChartComponent},
    { path: 'dynamic-barchart', component: DynamicBarchartComponent},
    { path: 'add-image', component: AddTypeofimageComponent},
  ]
}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
