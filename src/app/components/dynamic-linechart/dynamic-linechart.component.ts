import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dynamic-linechart',
  templateUrl: './dynamic-linechart.component.html',
  styleUrls: ['./dynamic-linechart.component.css']
})
export class DynamicLinechartComponent implements OnInit {

  constructor() { }
  @Input() title
  @Input() data
  @Input() subtitle
  @Input() yaxistext
  @Input() legend
  @Input() tickInterval
  ngOnInit() {
    this.lineChart()
  }
  linechart:any
  legendname:any
lineChart(){
  if(this.legend == "true"){
    this.legendname = true
}else if(this.legend == "false"){
    this.legendname = false
}
  this.linechart = new Chart({

    title: {
        text: this.title
    },

    subtitle: {
        text: this.subtitle
    },

    yAxis: {
        title: {
            text: this.yaxistext,
        },
        tickInterval : this.tickInterval,
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled : this.legendname
    },

    series: this.data,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
}
}
