import { Component, OnInit, Type } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { count } from 'rxjs-compat/operator/count';
import { DatatransferService } from '../../services/datatransfer.service'

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.css']
})
export class MainChartComponent implements OnInit {
  BarChartList = []
  LineChartList = []
  DonutChartList = []
  StackList = []
  WaterFalList = []
  constructor(private getdata:DatatransferService) { }
  type: any
  columncount=[]
  charttype:any
  layouttype:any
  ngOnInit() {

    this.charttype = localStorage.getItem("charttype")
    this.layouttype = localStorage.getItem("layouttype")
    // this.layouttype = this.getdata.layouttype
    // Bar Type
    this.type = this.charttype
    if(this.layouttype == 1){
      this.columncount = [6,6,6,6]
    }else if(this.layouttype == 2){
      this.columncount = [4,4,4,4,4,4]
    }else if(this.layouttype == 3){
      this.columncount = [4,4,4,4,8]
    }else if(this.layouttype == 4){
      this.columncount = [4,8,4,8]
    }else if(this.layouttype == 5){
      this.columncount = [4,4,4,4,4,4,4,4,4]
    }else if(this.layouttype == 6){
      this.columncount = [4,4,4,4,8,4,4,4]
    }else if(this.layouttype == 7){
      this.columncount = [4,4,4,4,8,8,4]
    }else if(this.layouttype == 8){
      this.columncount = [6,6,6,6,6,6]
    }
    // Tick Interval Count
    var count = 20

    // Bar Chart
    var barchart = [
      ['Shanghai', 24.2],
      ['Beijing', 20.8],
      ['Karachi', 14.9],
      ['Shenzhen', 13.7],
      ['Guangzhou', 13.1],
      ['Istanbul', 12.7],
    ]
    this.BarChartList.push({ title: "title1", value: barchart, color: "red", xaxisvalue: "xaxisvalue1", yaxisvalue: "yaxisvalue1", seriesname: "series1", legend: true, tickInterval: count,column:4 })
    this.BarChartList.push({ title: "title2", value: barchart, color: "green", xaxisvalue: "xaxisvalue2", yaxisvalue: "yaxisvalue2", seriesname: "series2", legend: false, tickInterval: count,column:4 })
    this.BarChartList.push({ title: "title3", value: barchart, color: "blue", xaxisvalue: "xaxisvalue3", yaxisvalue: "yaxisvalue3", seriesname: "series3", legend: true, tickInterval: count,column:4 })
    this.BarChartList.push({ title: "title4", value: barchart, color: "black", xaxisvalue: "xaxisvalue4", yaxisvalue: "yaxisvalue4", seriesname: "series4", legend: false, tickInterval: count,column:4 })
    this.BarChartList.push({ title: "title5", value: barchart, color: "purple", xaxisvalue: "xaxisvalue5", yaxisvalue: "yaxisvalue5", seriesname: "series5", legend: true, tickInterval: count,column:6 })
    this.BarChartList.push({ title: "title6", value: barchart, color: "orange", xaxisvalue: "xaxisvalue6", yaxisvalue: "yaxisvalue6", seriesname: "series6", legend: true, tickInterval: count,column:4 })
    this.BarChartList.push({ title: "title7", value: barchart, color: "yellow", xaxisvalue: "xaxisvalue7", yaxisvalue: "yaxisvalue7", seriesname: "series7", legend: false, tickInterval: count,column:4 })
    this.BarChartList.push({ title: "title8", value: barchart, color: "pink", xaxisvalue: "xaxisvalue8", yaxisvalue: "yaxisvalue8", seriesname: "series8", legend: true, tickInterval: count,column:4 })


    // Line Chart
    var linechart = [{
      name: 'Installation',
      data: [20, 46, 10, 7, 40, 3, 50, 50]
    }, {
      name: 'Manufacturing',
      data: [21, 45, 33, 67, 2, 11, 78, 33]
    }, {
      name: 'Sales & Distribution',
      data: [20, 46, 10, 7, 40, 3, 50, 50]
    }, {
      name: 'Project Development',
      data: [20, 46, 10, 7, 40, 3, 50, 50]
    }, {
      name: 'Other',
      data: [21, 45, 33, 67, 2, 11, 78, 33]
    }]
    var linechart2 = [{
      name: 'Installation',
      data: [21, 45, 33, 67, 2, 11, 78, 33]
    }, {
      name: 'Manufacturing',
      data: [20, 46, 10, 7, 40, 3, 50, 50]
    }, {
      name: 'Sales & Distribution',
      data: [21, 45, 33, 67, 2, 11, 78, 33]
    }, {
      name: 'Project Development',
      data: [20, 46, 10, 7, 40, 3, 50, 50]
    }, {
      name: 'Other',
      data: [21, 45, 33, 67, 2, 11, 78, 33]
    }]

    this.LineChartList.push({ title: "title1", subtitle: "subtitle1", value: linechart2, yaxistext: "yaxistext1", legend: false, tickInterval: count })
    this.LineChartList.push({ title: "title2", subtitle: "subtitle2", value: linechart, yaxistext: "yaxistext2", legend: false, tickInterval: count })
    this.LineChartList.push({ title: "title3", subtitle: "subtitle3", value: linechart, yaxistext: "yaxistext3", legend: false, tickInterval: count })
    this.LineChartList.push({ title: "title4", subtitle: "subtitle4", value: linechart, yaxistext: "yaxistext4", legend: false, tickInterval: count })
    this.LineChartList.push({ title: "title5", subtitle: "subtitle5", value: linechart2, yaxistext: "yaxistext5", legend: false, tickInterval: count })
    // this.LineChartList.push({ title: "title6", subtitle: "subtitle6", value: linechart, yaxistext: "yaxistext6", legend: true, tickInterval: count })


    // Donut Chart
    var donutList1 = [
      {
        name: "Data Center",
        y: 6,
        color: "red",
      },
      {
        name: "Data Center",
        y: 51,
        color: "green",
      },
      {
        name: "Data Center",
        y: 9,
        color: "blue",
      },
      {
        name: "Data Center",
        y: 43,
        color: "black",
      },
      {
        name: "Data Center",
        y: 34,
        color: "orange",
      },
    ]
    var donutList2 = [
      {
        name: "Data Center",
        y: 34,
        color: "red",
      },
      {
        name: "Data Center",
        y: 34,
        color: "green",
      },
      {
        name: "Data Center",
        y: 34,
        color: "black",
      },
      {
        name: "Data Center",
        y: 34,
        color: "red",
      },
      {
        name: "Data Center",
        y: 34,
        color: "orange",
      },
    ]
    var donutList3 = [
      {
        name: "Data Center",
        y: 34,
        color: "red",
      },
      {
        name: "Data Center",
        y: 34,
        color: "black",
      },
      {
        name: "Data Center",
        y: 34,
        color: "green",
      },
      {
        name: "Data Center",
        y: 34,
        color: "purple",
      },
      {
        name: "Data Center",
        y: 34,
        color: "blue",
      },
    ]

    this.DonutChartList.push({ title: "title1", value: donutList1, seriesname: "series1", legend: true })
    this.DonutChartList.push({ title: "title2", value: donutList3, seriesname: "series2", legend: false })
    this.DonutChartList.push({ title: "title3", value: donutList2, seriesname: "series3", legend: true })
    this.DonutChartList.push({ title: "title4", value: donutList1, seriesname: "series4", legend: false })
    this.DonutChartList.push({ title: "title5", value: donutList3, seriesname: "series5", legend: true })
    this.DonutChartList.push({ title: "title6", value: donutList2, seriesname: "series6", legend: true })

    //  Stacked Bar Chart
    var stackList = [{
      name: 'John',
      data: [53, 31, 14, 17, 2],
      color: "green"
    }, {
      name: 'Jane',
      data: [32, 12, 3, 2.6, 11],
      color: "purple"
    }, {
      name: 'Joe',
      data: [3, 14, 45, 22, 15],
      color: "orange"
    }]

    var catcolor = ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    this.StackList.push({ title: "title1", value: stackList, seriesname: "series1", legend: true, catcolor: catcolor, yAxis: "yAxis1", tickInterval: count, enabled: true })
    this.StackList.push({ title: "title2", value: stackList, seriesname: "series2", legend: false, catcolor: catcolor, yAxis: "yAxis2", tickInterval: count, enabled: false })
    this.StackList.push({ title: "title3", value: stackList, seriesname: "series3", legend: true, catcolor: catcolor, yAxis: "yAxis3", tickInterval: count, enabled: true })
    this.StackList.push({ title: "title4", value: stackList, seriesname: "series4", legend: false, catcolor: catcolor, yAxis: "yAxis4", tickInterval: count, enabled: false })
    this.StackList.push({ title: "title5", value: stackList, seriesname: "series5", legend: true, catcolor: catcolor, yAxis: "yAxis5", tickInterval: count, enabled: true })
    this.StackList.push({ title: "title6", value: stackList, seriesname: "series6", legend: true, catcolor: catcolor, yAxis: "yAxis6", tickInterval: count, enabled: true })


    // Water fall chart

    var waterfall = [{
      name: 'Start',
      y: 12,
      color: "blue"
    }, {
      name: 'Product Revenue',
      y: 56,
      color: "pink"
    }, {
      name: 'Service Revenue',
      y: 23,
      color: "black"
    }, {
      name: 'Positive Balance',
      isIntermediateSum: true,
      color: "green"
    }, {
      name: 'Fixed Costs',
      y: -3,
      color: "orange"
    }, {
      name: 'Variable Costs',
      y: -2,
      color: "purple"
    }, {
      name: 'Balance',
      isSum: true,
      color: "red"
    }]
    this.WaterFalList.push({ title: "title1", value: waterfall, seriesname: "series1", legend: true, catcolor: catcolor, yAxis: "yAxis1", tickInterval: count, enabled: true })
    this.WaterFalList.push({ title: "title2", value: waterfall, seriesname: "series2", legend: false, catcolor: catcolor, yAxis: "yAxis2", tickInterval: count, enabled: false })
    this.WaterFalList.push({ title: "title3", value: waterfall, seriesname: "series3", legend: true, catcolor: catcolor, yAxis: "yAxis3", tickInterval: count, enabled: true })
    this.WaterFalList.push({ title: "title4", value: waterfall, seriesname: "series4", legend: false, catcolor: catcolor, yAxis: "yAxis4", tickInterval: count, enabled: false })
    this.WaterFalList.push({ title: "title5", value: waterfall, seriesname: "series5", legend: true, catcolor: catcolor, yAxis: "yAxis5", tickInterval: count, enabled: true })
    this.WaterFalList.push({ title: "title6", value: waterfall, seriesname: "series6", legend: true, catcolor: catcolor, yAxis: "yAxis6", tickInterval: count, enabled: true })
    this.WaterFalList.push({ title: "title6", value: waterfall, seriesname: "series7", legend: true, catcolor: catcolor, yAxis: "yAxis7", tickInterval: count, enabled: true })
  }
}
