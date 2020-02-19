import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-dynamic-stackedbarchart',
  templateUrl: './dynamic-stackedbarchart.component.html',
  styleUrls: ['./dynamic-stackedbarchart.component.css']
})
export class DynamicStackedbarchartComponent implements OnInit {

  constructor() { }
 @Input() data
 @Input() title
 @Input() seriesname
 @Input() catcolor
 @Input() yAxis
 @Input() tickInterval
 @Input() enabled
  ngOnInit() {
    this.StackedBarChart()
  }
  stackbarchart:any
 StackedBarChart(){
  this.stackbarchart = new Chart({
    chart: {
        type: 'column'
    },
    title: {
        text: this.title
    },
    xAxis: {
        categories: this.catcolor
    },
    yAxis: {
        min: 0,
        title: {
            text: this.yAxis
        },
        stackLabels: {
            enabled: this.enabled,
            style: {
                fontWeight: 'bold',
                // color: ( 
                //     Highcharts.defaultOptions.title.style &&
                //     Highcharts.defaultOptions.title.style.color
                // ) || 'gray'
            }
        },
        tickInterval:this.tickInterval
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        // backgroundColor:"green",
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: this.data,
});
 }
}
