import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-dynamic-donutchart',
  templateUrl: './dynamic-donutchart.component.html',
  styleUrls: ['./dynamic-donutchart.component.css']
})
export class DynamicDonutchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.DonutChart()
  }
  @Input() data
  @Input() title
  @Input() seriesname
  @Input() legend
  @Input() color

  donutChart:any
DonutChart(){
  this.donutChart = new Chart ({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        // height:300
    },
    title: {
        text: this.title,
        align: 'center',
        verticalAlign: 'middle',
        y: 8
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: 0,
            endAngle: 360,
            center: ['50%', '50%'],
            size: '80%'
        }
    },
    series: [{
        type: 'pie',
        name: this.seriesname,
        innerSize: '50%',
        data: this.data,
        color:this.color
    }]
});
}
}
