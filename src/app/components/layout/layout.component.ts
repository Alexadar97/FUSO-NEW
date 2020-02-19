import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatransferService } from '../../services/datatransfer.service'
declare var $;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  charttype: any
  constructor(private router: Router, private getdata: DatatransferService) { }
  columncount1 = []
  columncount2 = []
  columncount3 = []
  columncount4 = []
  columncount5 = []
  columncount6 = []
  columncount7 = []
  columncount8 = []
  ovarallList = []
  set=[]
  ngOnInit() {
    // this.ovarallList = [3,3,3,3]
    this.columncount1 = [6, 6, 6, 6]
    this.columncount2 = [4, 4, 4, 4, 4, 4]
    this.columncount3 = [4, 4, 4, 4, 8]
    this.columncount4 = [4, 8, 4, 8]
    this.columncount5 = [4, 4, 4, 4, 4, 4, 4, 4, 4]
    this.columncount6 = [4, 4, 4, 4, 8, 4, 4, 4]
    this.columncount7 = [4, 4, 4, 4, 8, 8, 4]
    this.columncount8 = [6, 6, 6, 6, 6, 6]
    this.ovarallList.push(this.columncount1, this.columncount2, this.columncount3, this.columncount4, this.columncount5, this.columncount6, this.columncount7, this.columncount8)
 }
  chartvalue: any
  ChartType(value) {
    this.chartvalue = value
  }
  layouttype: any
  dynamicvlaue(value) {
    value = value+1
    this.layouttype = value
    // if(this.chartvalue == "" || this.chartvalue == undefined){
    //   this.getdata.showNotification('bottom', 'right', 'Please Select Chart Type !!', "danger");
    // }else{
    //   this.router.navigateByUrl("/components/main-chart")
    //   this.getdata.charttype = this.chartvalue
    //   this.getdata.layouttype = value
      localStorage.setItem("charttype",this.chartvalue)
    localStorage.setItem("layouttype", value)
    // }
  }
  next() {
    if (this.layouttype == undefined || this.layouttype == "") {
      this.getdata.showNotification('bottom', 'right', 'Please Select Chart Layout !!', "danger");
    } else {
      this.router.navigateByUrl("/components/add-image")
    }
  }
  clickbox(index){
    $(document).ready(function () {
      $("#box"+index).addClass("bg-color");
    });
  }
}
