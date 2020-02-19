import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dynamic-waterfallchart',
  templateUrl: './dynamic-waterfallchart.component.html',
  styleUrls: ['./dynamic-waterfallchart.component.css']
})
export class DynamicWaterfallchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.WaterFallChart()
  }
  @Input() title
  @Input() data
  @Input() yAxis
  @Input() legend
  @Input() tickInterval
  @Input() seriesname
  WaterFall:any
WaterFallChart(){
  this.WaterFall = new Chart({
    chart: {
        type: 'waterfall'
    },

    title: {
        text: this.title
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: this.yAxis
        },
        tickInterval : this.tickInterval,
    },

    legend: {
        enabled: this.legend
    },

    tooltip: {
        pointFormat: '<b>${point.y:,.2f}</b> USD'
    },

    series: [{
        // upColor: Highcharts.getOptions().colors[2],
        data: this.data,
        name: this.seriesname,
       
        
    }]
});
}
}
