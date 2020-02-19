import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from '../../services/canactivate.service';
import { ComponentsComponent } from '../../components/components.component';
import { DynamicBarchartComponent } from '../../components/dynamic-barchart/dynamic-barchart.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { MainChartComponent } from '../../components/main-chart/main-chart.component';
import { AddTypeofimageComponent } from '../../components/add-typeofimage/add-typeofimage.component';
import { LoginComponent } from '../../components/login/login.component';
import { HomeComponent } from '../../components/home/home.component';
import { NewInitiativeComponent } from '../../components/new-initiative/new-initiative.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: "newInitiative"},
  {
    path:'newInitiative',component:NewInitiativeComponent,
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
