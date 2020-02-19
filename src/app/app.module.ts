import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { WebserviceService } from './services/webservice.service';
import { UIserviceService } from './services/ui.service';
import { DatatransferService } from './services/datatransfer.service';
import { AuthGuard } from './services/canactivate.service';
import { ModalModule } from 'ngx-modialog';
import { HttpClientModule }    from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import {TabModule} from 'angular-tabs-component';
import {ChartModule,HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// import { StoreModule } from '@ngrx/store';
// import { SimpleReducer } from '../components/simple-reducer';

import { ComponentsComponent } from './components/components.component';
import { DynamicBarchartComponent } from './components/dynamic-barchart/dynamic-barchart.component';
import { DynamicLinechartComponent } from './components/dynamic-linechart/dynamic-linechart.component';
import { DynamicDonutchartComponent } from './components/dynamic-donutchart/dynamic-donutchart.component';
import { DynamicStackedbarchartComponent } from './components/dynamic-stackedbarchart/dynamic-stackedbarchart.component';
import { DynamicWaterfallchartComponent } from './components/dynamic-waterfallchart/dynamic-waterfallchart.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MainChartComponent } from './components/main-chart/main-chart.component';
import { AddTypeofimageComponent } from './components/add-typeofimage/add-typeofimage.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewInitiativeComponent } from './components/new-initiative/new-initiative.component';
import { CformComponent } from './components/cform/cform.component';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { NewMeasureComponent } from './components/new-measure/new-measure.component';
import { NotifyComponent } from './components/notify/notify.component';
import { EditInitiativeComponent } from './components/edit-initiative/edit-initiative.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewInitiativeComponent } from './components/view-initiative/view-initiative.component';
import { MeasureComponent } from './components/measure/measure.component';


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    DynamicBarchartComponent,
    DynamicLinechartComponent,
    DynamicDonutchartComponent,
    DynamicStackedbarchartComponent,
    DynamicWaterfallchartComponent,
    LayoutComponent,
    MainChartComponent,
    AddTypeofimageComponent,
    LoginComponent,
    HomeComponent,
    NewInitiativeComponent,
    CformComponent,
    TopmenuComponent,
    NewMeasureComponent,
    NotifyComponent,
    EditInitiativeComponent,
    DashboardComponent,
    SidebarComponent,
    ViewInitiativeComponent,
    MeasureComponent,

  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    HttpClientModule,
    HighchartsChartModule,
    NgxSpinnerModule,
    TabModule,
    ChartModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot()

    // StoreModule.forRoot({message:SimpleReducer}),
  ],
  providers: [
    WebserviceService,
    UIserviceService,
    AuthGuard,
    DatatransferService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
