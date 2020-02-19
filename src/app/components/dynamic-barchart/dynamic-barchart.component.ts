import { Component, OnInit, Input } from '@angular/core';
// import { DatatransferService } from '../../components/services/datatransfer.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Chart } from 'angular-highcharts';
declare var $, moment;

@Component({
  selector: 'app-dynamic-barchart',
  templateUrl: './dynamic-barchart.component.html',
  styleUrls: ['./dynamic-barchart.component.css']
})
export class DynamicBarchartComponent implements OnInit {

  constructor() { }
  @Input() title;
  @Input() data;
  @Input() color;
  @Input() xaxisvalue;
  @Input() yaxisvalue;
  @Input() seriesname;
  @Input() legend;
  @Input() tickInterval;
  ngOnInit(): void  {
    if(this.data != undefined){
      this.chart(this.title)
    }else{
      // this.showMessage
    }
  }
  legendname:any
  barchart:any
  chart(data){
    if(this.legend == "true"){
        this.legendname = true
    }else if(this.legend == "false"){
        this.legendname = false
    }
   this.barchart = new Chart ({
        chart: {
            type: 'column',
        },
        title: {
            text: data
        },
        subtitle: {
            text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        },
       
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: this.yaxisvalue,
            },
            tickInterval : this.tickInterval,
        },
        legend: {
            enabled: this.legendname
        },
        tooltip: {
            // pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
        },
        series: [{
            name: this.seriesname,
            data: this.data,
            color:this.color
            // dataLabels: {
            //     enabled: true,
            //     rotation: -90,
            //     color: '#FFFFFF',
            //     align: 'right',
            //     format: '{point.y:.1f}',
            //     y: 10,
            //     style: {
            //         fontSize: '13px',
            //         fontFamily: 'Verdana, sans-serif'
            //     }
            // }
        }]
    })
  }
}
