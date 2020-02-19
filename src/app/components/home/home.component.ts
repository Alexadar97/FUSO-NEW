import { Component, OnInit } from '@angular/core';
import {trigger,transition,style,animate} from '@angular/animations'

import { Router } from '@angular/router';

import {Location} from '@angular/common';
import { WebserviceService } from '../../services/webservice.service'

import { Chart } from 'angular-highcharts';


declare var $,_;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({  opacity: 0 }),
            animate('0.5s ease-in',
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.5s ease-out',
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HomeComponent implements OnInit {

  showNewBtn = false
  constructor(private router:Router,private _location:Location,private webservice:WebserviceService) { }

  itemList=[]
  selectedItem = 0;
  barchart1
  barchart2
  barchart3

  ngOnInit() {

    var urlValue = "/DTAOneApp/initiative/list";
    var urlValue2 = "/DTAOneApp/initiative/listActivities"
    var submitData = "";
    this.webservice.method(urlValue2, submitData, 'post')
    .subscribe(list => {
      console.log(list);
      list = _.reverse(list)

      list.map((item=>{
        this.itemList.push({
          id:item.id,
          title:item.name,
          ilstatus:item.ilstatus,
          noofmeasures:item.noofmeasures,
          measureList:item.measures,
          lead:item.lead
        })
      }))
    },Error=>{
      console.log(Error);
    })


    this.barchart1 = new Chart(
      {
        chart: {
            type: 'column',
            backgroundColor:'transparent'
        },
        colors: ['#009A8E', '#01677e', '#888888'],
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
          visible:false,
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
            min: 0,
            title: {
                text: 'Total'
            },
            stackLabels: {
                enabled: false,
                style: {
                    fontWeight: 'bold',
                    color: 'gray'
                }
            }
        },
        legend: {
          enabled:false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          enabled:false,
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        exporting:{
          enabled:false
        },
        series: [{
            // name: 'John',
            data: [5,1,3,5,2]
        }]
    })


    this.barchart2 = new Chart(
      {
        chart: {
            type: 'line',
            backgroundColor:'transparent'
        },
        colors: ['#009A8E', '#01677e', '#888888'],
        title: {
            text: ''
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
          visible:false,
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
            min: 0,
            title: {
                text: 'Total'
            },
            stackLabels: {
                enabled: false,
                style: {
                    fontWeight: 'bold',
                    color: 'gray'
                }
            }
        },
        legend: {
          enabled:false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          enabled:false,
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        exporting:{
          enabled:false
        },
        series: [{
            // name: 'John',
            data: [5,1,3,5,2]
        }]
    })


  }

  changeSelectedItem(i){
    if(i == this.selectedItem){
      //close the item
      this.selectedItem = -1
    }else{
      this.selectedItem = i
    }


  }

  createBtn(){
    //show drop down - leads to new initiative & new measure
    this.showNewBtn = !this.showNewBtn;
    if(this.showNewBtn){
      setTimeout(()=>{ 
        this.showNewBtn = false
       }, 3000);
    }
    
  }

  newInitiative(){
    //route to new initiative
    this.router.navigateByUrl('initiative')
  }

  newMeasure(){
    //route to new measure
    this.router.navigateByUrl('newMeasure')
  }

  back(){
    this._location.back();
  }

  openInitiative(id){
    localStorage.setItem("selectedId",id)
    this.router.navigateByUrl('viewInitiative')

  }

  getLetter(word){
    if(word == '' || word == null || word == undefined){
      return ''
    }else{
      return word.split('')[0].toUpperCase();
    }

  }

}
