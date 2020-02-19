import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-typeofimage',
  templateUrl: './add-typeofimage.component.html',
  styleUrls: ['./add-typeofimage.component.css']
})
export class AddTypeofimageComponent implements OnInit {

  constructor() { }
  WaterFalList=[]
  columncount=[]
  layouttype:any
  ngOnInit() {
    this.layouttype = localStorage.getItem("layouttype")
    // this.layouttype = this.getdata.layouttype
    // Bar Type
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
  }
  clickplus(index){
    console.log(index)
  }
}
