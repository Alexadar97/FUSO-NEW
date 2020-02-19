import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../../services/webservice.service'
import { UIserviceService } from '../../services/ui.service'

import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  verticalList = [];
  horizontalList = [];
  otherListX = [];
  otherListY = [];
  barchart1
  barchart2;
  constructor(private webservice:WebserviceService) { }
// colors: ['#009A8E', '#01677e', '#888888'],
  settingData(seriesData){
    var chartSetting = {
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
              enabled: true,
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
                  enabled: true
              }
          }
      },
      exporting:{
        enabled:false
      },
      series: seriesData
  }
    return chartSetting

  }

  cloneChartDataLoad(){
    var dashboardUrl = "/DTAOneApp/dashboard/get"
    var dMap = {}
    this.listDataFetch(dashboardUrl,{}).then((dashdata:Array<any>)=>{
      // console.log(dashdata);
      dashdata.map(dash=>{
        // var arr = dMap[]
      })

    });

  }


  normalizedDashboardMap = {}
  normalBarchartArr = {}
  normalVerticalPillar = 1
  loadNormalizedChart(){
    var dashboardUrl = "/DTAOneApp/dashboard/getNormalized"
    this.listDataFetch(dashboardUrl,{}).then((dashdata:Array<any>)=>{
      console.log(dashdata);
      this.normalVerticalPillar = dashdata[0]['vertpillarid']

      dashdata.map((dash)=>{
        // console.log(dash);
        
        var key = 'h'+dash['horipillarid']+'v'+dash['vertpillarid']
        var valueFrmMap = this.normalizedDashboardMap[key]
        if(valueFrmMap == undefined){
          
          this.normalizedDashboardMap[key] = {}
          
          this.normalizedDashboardMap[key]['size'] = 1
          this.normalizedDashboardMap[key]['a1'] = dash
        }else{
          
          var size = this.normalizedDashboardMap[key]['size'];
          size = size+1;
          this.normalizedDashboardMap[key]['size'] = size
          this.normalizedDashboardMap[key]['a'+size] = dash
          
          
        }
      })

      console.log(this.normalizedDashboardMap)
      

      //fillrate
      this.horizontalList.map((h,hIndex)=>{
        this.verticalList.map((v,vIndex)=>{
          console.log(h);

          if(this.normalizedDashboardMap['h'+(h.id)+'v'+this.normalVerticalPillar]){


          
          var size = this.normalizedDashboardMap['h'+(h.id)+'v'+this.normalVerticalPillar]['size']
          if(size == 2){
            var seriesData = [{

              data: [this.normalizedDashboardMap['h'+(h.id)+'v'+this.normalVerticalPillar]['a1']['target']]
            }, {
        
              data: [this.normalizedDashboardMap['h'+(h.id)+'v'+this.normalVerticalPillar]['a1']['value']]
            }]
            
            
            var barchart = new Chart(this.settingData(seriesData))
            this.normalBarchartArr['h'+h.id+'v'+this.normalVerticalPillar+'a1'] = barchart


            var seriesData2 = [{

              data: [this.normalizedDashboardMap['h'+(h.id)+'v'+this.normalVerticalPillar]['a2']['target']]
            }, {
        
              data: [this.normalizedDashboardMap['h'+(h.id)+'v'+this.normalVerticalPillar]['a2']['value']]
            }]
            
            
            var barchart2 = new Chart(this.settingData(seriesData2))
            this.normalBarchartArr['h'+h.id+'v'+this.normalVerticalPillar+'a2'] = barchart2
          }else{
            var seriesData = [{

              data: [this.normalizedDashboardMap['h'+(h.id)+'v'+this.normalVerticalPillar]['a1']['target']]
            }, {
        
              data: [this.normalizedDashboardMap['h'+(h.id)+'v'+this.normalVerticalPillar]['a1']['value']]
            }]
            
            
            var barchart = new Chart(this.settingData(seriesData))
            this.normalBarchartArr['h'+h.id+'v'+this.normalVerticalPillar+'a1'] = barchart
          }
        }
          
        })
      })
    });
  }

  loadDynamicChartData(){
    var dashboardUrl = "/DTAOneApp/dashboard/get"
    this.listDataFetch(dashboardUrl,{}).then((dashdata:Array<any>)=>{
      dashdata.map((dash)=>{
        console.log(dash);
        var key = 'h'+dash['horipillarid']+'v'+dash['vertpillarid']
        var valueFrmMap = this.dashboardMap['h'+dash['horipillarid']+'v'+dash['vertpillarid']]
        if(valueFrmMap == undefined){
          
          this.dashboardMap[key] = {}
          
          this.dashboardMap[key]['size'] = 1
          this.dashboardMap[key]['a1'] = dash
        }else{
          console.log(this.dashboardMap);
          var size = this.dashboardMap[key]['size'];
          size = size+1;
          this.dashboardMap[key]['size'] = size
          this.dashboardMap[key]['a'+size] = dash
          
          
        }
      })

      console.log(this.dashboardMap)

      //fillrate
      this.horizontalList.map((h,hIndex)=>{
        this.verticalList.map((v,vIndex)=>{
          // console.log(h);

          var size = this.dashboardMap['h'+(h.id)+'v'+(v.id)]['size']
          if(size == 2){
            var seriesData = [{

              data: [this.dashboardMap['h'+(h.id)+'v'+(v.id)]['a1']['target']]
            }, {
        
              data: [this.dashboardMap['h'+(h.id)+'v'+(v.id)]['a1']['value']]
            }]
            
            
            var barchart = new Chart(this.settingData(seriesData))
            this.barchartArr['h'+h.id+'v'+v.id+'a1'] = barchart


            var seriesData2 = [{

              data: [this.dashboardMap['h'+(h.id)+'v'+(v.id)]['a2']['target']]
            }, {
        
              data: [this.dashboardMap['h'+(h.id)+'v'+(v.id)]['a2']['value']]
            }]
            
            
            var barchart2 = new Chart(this.settingData(seriesData2))
            this.barchartArr['h'+h.id+'v'+v.id+'a2'] = barchart2
          }else{
            var seriesData = [{

              data: [this.dashboardMap['h'+(h.id)+'v'+(v.id)]['a1']['target']]
            }, {
        
              data: [this.dashboardMap['h'+(h.id)+'v'+(v.id)]['a1']['value']]
            }]
            
            
            var barchart = new Chart(this.settingData(seriesData))
            this.barchartArr['h'+h.id+'v'+v.id+'a1'] = barchart
          }
          
          
        })
      })

      // console.log(this.dashboardMap)

      this.barchart1 = new Chart(this.settingData([{data:[1000]},{data:[0]}]))
      

    })
  }

  barchartArr = {}
  dashboardMap = {}
  ngOnInit() {
    //call horizontal and vertical - create a box
    var urlValue = "/DTAOneApp/horizontal/list";
    var urlValue2 = "/DTAOneApp/vertical/list";

    var promiseArr = [];
    promiseArr.push(this.listDataFetch(urlValue,{}))
    promiseArr.push(this.listDataFetch(urlValue2,{}))

    Promise.all(promiseArr).then((resultArr)=>{
      this.horizontalList = resultArr[0]
      this.verticalList = resultArr[1]

    
      // this.horizontalList.map((hItem)=>{
      //   this.otherListX.push(1)
      // })
      // this.otherListY.push(1)
      // this.verticalList.map((vItem)=>{
      //   this.otherListY.push(1)
      // })

      this.loadDynamicChartData();
      // this.cloneChartDataLoad();
      
      this.loadNormalizedChart();
    
      


    })


    


    

    



  }

  listDataFetch(urlValue,submitData){
    return new Promise((resolve,reject)=>{
      this.webservice.method(urlValue, submitData, 'post')
      .subscribe(list => {
        resolve(list)
      },Error=>{
        console.log(Error);
      })

    });
  }

  fetchBarGraph(dMap, hj, vj) {
    // console.log(dMap);
    // console.table([hj,vj])
    // var seriesData = [{

    //   data: [this.dashboardMap['h' + (h.id) + 'v' + (v.id)]['target']]
    // }, {

    //   data: [this.dashboardMap['h' + (h.id) + 'v' + (v.id)]['value']]
    // }]

    var seriesData = [{
      data:[10]
    }]

    var barchart = new Chart(this.settingData(seriesData))
    return barchart
  }

}
