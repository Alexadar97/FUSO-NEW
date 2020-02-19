import { Component, OnInit } from '@angular/core';
import {trigger,transition,style,animate} from '@angular/animations'

import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { WebserviceService } from '../../services/webservice.service' 
import { UIserviceService } from '../../services/ui.service' 

@Component({
  selector: 'app-edit-initiative',
  templateUrl: './edit-initiative.component.html',
  styleUrls: ['./edit-initiative.component.css'],
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
export class EditInitiativeComponent implements OnInit {
  initiativeForm:FormGroup
  numbervalidation = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
  elementsList = [];
  elementsList2 = [];
  elementsList3 = [];
  elementsList4 = [];
  elementsList5 = [];
  elementList6 = [];

  notifyMessage = "";
  notify = false;
  fineUrl = "/DTAOneApp/findrivermap/list"
  //horipillarid
  

  horizontalList = [];

  groupIdArr = []
  keyMasterMap = {}
  markerList = []
  potentialList = []

  constructor(private fb: FormBuilder,private _location:Location,private webservice:WebserviceService,private ui:UIserviceService,private router:Router) { }

  populateElementList5(ilStatusList){
    var key = {}
    ilStatusList.map((status) => {
      key[status.baseline] = []
      this.elementsList5.push(this.ui.form(status.baseline, status.baseline, 2, "date", []))
    });
    const row = this.fb.group(key);
    this.statusArr.push(row)
  }

  populateElementList2(horizontalList,verticalList,areaList,currencyList,ilStatusList,marker){
    this.elementsList2 = [
      this.ui.formRequired("Horizontal Pillar", "horipillarid", 6, "select", horizontalList),
      this.ui.formRequired("Vertical Pillar", "vertpillarid", 6, "select", verticalList),
      this.ui.formRequired("Financial Impact", "finimpactid", 4, "select", []),
      this.ui.formRequired("Area", "areaid", 4, "select", areaList),
      this.ui.formRequired("Currency", "tags", 4, "select", currencyList),
    ]

    console.log(ilStatusList);
    console.log(marker);

    this.populateElementList5(ilStatusList)
    
    var baselineYear = marker[0]['baseline']
    var endYear = marker[0]['marker']
    var markerSeries = []
    for(var i=baselineYear;i<=endYear;i++){
      if(i!=baselineYear){
        markerSeries.push(i)
      }else{
        markerSeries.push("Baseline-"+i)
      }
      
    }

    this.markerList = markerSeries
    // this.potentialList = potentialList
   
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

  ngOnInit() {

    this.markerList = [];
    this.potentialList = [];


  
    // var urlValue = "http://172.30.1.18:8080/DTAOneApp/horizontal/list";
    var urlValue = "/DTAOneApp/horizontal/list";
    var urlValue2 = "/DTAOneApp/vertical/list";
    var urlValue3 = "/DTAOneApp/area/list";
    var urlValue4 = "/DTAOneApp/currency/list";

    var urlKeys = "/DTAOneApp/group/getGroupKeys"
    //horipillarid

    var urlValues = "/DTAOneApp/group/getGroupKeys"
    //verticalid and group id is needed

    var ilStatusUrl = "/DTAOneApp/ilstatus/list"


    var markerUrl = "/DTAOneApp/marker/list"

    var saveCommentsUrl = "/DTAOneApp/initiative/saveComments"
    //comments with similar to initiative save 
    
    var potentialUrl = "/DTAOneApp/potential/list"

    var submitData = {}
    // this.populateList([])
    var promiseList = [];

    promiseList.push(this.listDataFetch(urlValue,submitData))
    promiseList.push(this.listDataFetch(urlValue2,submitData))
    promiseList.push(this.listDataFetch(urlValue3,submitData))
    promiseList.push(this.listDataFetch(urlValue4,submitData))
    promiseList.push(this.listDataFetch(ilStatusUrl,submitData))
    promiseList.push(this.listDataFetch(markerUrl,submitData))
    // promiseList.push(this.listDataFetch(potentialUrl,submitData))

    // this.notify = true
    // this.notifyMessage = "Data Loading!"
    Promise.all(promiseList).then((dataArr)=>{
     
      // this.notify = false
      this.populateElementList2(dataArr[0], dataArr[1], dataArr[2], dataArr[3],dataArr[4],dataArr[5])
    })
  

    var req = Validators.compose([Validators.required]);
    var phone = Validators.compose([Validators.required, Validators.pattern(this.numbervalidation)]);
    this.initiativeForm = this.fb.group({
      title: ["", req],
      description: ["", req],
      tags: ["", req],
      horipillarid:[null,req],
      
      finimpactid:[null,req],
      areaid:[null,req],
      respl2:[""],
      respl3:[""],
      respl4:[""],
      vertpillarid:[null],
      groupvalues: this.fb.array([]),
      ilstatus: this.fb.array([]),
      potential: this.fb.array([]),

      // title: ["Test", req],
      // description: ["Test", req],
      // tags: ["Test", req],
      // horipillarid:[null,req],
      
      // finimpactid:[null,req],
      // areaid:[null,req],
      // respl2:["Test"],
      // respl3:["Test"],
      // respl4:["Test"],
      // vertpillarid:[null],
      // groupvalues: this.fb.array([]),
      // ilstatus: this.fb.array([]),
      // potential: this.fb.array([]),
      

    });

    this.elementsList = [
      this.ui.formRequired("Initiative Title", "title", 12, "text", []),
      this.ui.formRequired("Description", "description", 12, "textarea", []),
      this.ui.formRequired("Tags", "tags", 12, "text", []),
    ]



    this.elementsList3 = [
      this.ui.form("L2", "title", 4, "text", []),
      this.ui.form("L3", "title", 4, "text", []),
      this.ui.form("L4", "title", 4, "text", []),
    ]

    this.elementsList4 = [
      this.ui.form("Region", "title", 2, "select", []),
      this.ui.form("Country", "title", 2, "select", []),
      this.ui.form("Type", "title", 2, "select", []),
      this.ui.form("RC/SC", "title", 2, "select", []),
      this.ui.form("Get?", "title", 2, "select", []),
    ]

   

   //horipillarid

  this.onHorizontalValueChange()
  this.onVerticalValueChange();
  
  }

  clearArr(){
    while (this.groupArr.length !== 0) {
      this.groupArr.removeAt(0)
    }
  }

  onHorizontalValueChange(){

   this.initiativeForm.get('horipillarid').valueChanges.subscribe(data=>{
    
    
    var submitData = "horipillarid="+parseInt(data)
    this.webservice.method(this.fineUrl, submitData, 'post')
     .subscribe(finData => {
       console.log(finData);
       // var finDataObj = this.elementsList2[2]
       this.elementsList2[2] = this.ui.formRequired("Financial Impact","finimpactid",4,"select",finData)
     },Error=>{
       console.log(Error);
     });


     var urlKeys = "/DTAOneApp/group/getGroupKeys"

   //horipillarid
     this.listDataFetch(urlKeys,"horipillarid="+parseInt(data)).then((datalist:Array<any>)=>{
      
       var keys = [];
       var groupKey = {};
     

       this.clearArr()

       for(var i=0;i<datalist.length;i++){
         // keys.push(data[i].title)
         this.groupIdArr.push(datalist[i].groupid)
         var keyObj = this.ui.form(datalist[i].title,datalist[i].title, 2, "select", [])
         keyObj['level'] = datalist[i].level
         keyObj['group'] = datalist[i].groupid
         keys.push(keyObj)
         groupKey[datalist[i].title] = []
         
       }
       const row = this.fb.group(groupKey);
   
       this.groupArr.push(row)
      
       this.elementList6  = keys;
       
       // this.rowForms.push(row);
     })


     var urlPotential =  "/DTAOneApp/potential/list"
    //  this.listDataFetch(urlPotential,"horipillarid="+parseInt(data)).then((dataList:Array<any>)=>{
    //   this.potentialList = dataList
     
    // });
    var submitData3 = "horipillarid="+parseInt(data)
    this.webservice.method(urlPotential, submitData3, 'post')
     .subscribe(dataList => {
      this.potentialList = dataList
     });

    
  },Error=>{
    console.log(Error);
  });

  }

  onVerticalValueChange(){
    this.initiativeForm.get('vertpillarid').valueChanges.subscribe(verticalId=>{
      
      
      var urlValues = "/DTAOneApp/group/getGroupValues"
      //verticalid and group id is needed
      //groupIdArr - comma seperated
      var groupIdArr = this.groupIdArr[0]+','+this.groupIdArr[0];
  
      this.listDataFetch(urlValues,"vertpillarid="+parseInt(verticalId)+"&groupid="+groupIdArr).then((data:Array<any>)=>{
        
        var jsonString = data[0]['levelvalues']
        jsonString = jsonString.replace(/\'/g,'"');
        var tempVal = JSON.parse(jsonString)
        
        var levelKeys = Object.keys(tempVal)
        
  
        levelKeys.map((keyVal)=>{
          
          this.elementList6.map((element,index)=>{
            
            if(keyVal == 'level'+element['level'] && this.groupIdArr[0] == element['group']){
              var elOptions = element['options'];
              var tempOptionString = tempVal[keyVal]
              var tempOptionArr = tempOptionString.split(',')
              tempOptionArr.map((option)=>{
                elOptions.push({id:option,name:option})
              })
              this.elementList6[index]["options"] = elOptions; 
              
            }
          })
        })
  
        
        
  
      })
      
  
  
    },Error=>{
      console.log(Error);
    });
  }

  get groupArr(){
    return this.initiativeForm.get("groupvalues") as FormArray
  }

  get statusArr(){
    return this.initiativeForm.get("ilstatus") as FormArray
  }

  get potentialArr(){
    return this.initiativeForm.get("potential") as FormArray
  }

  saveBtn(){
    
    var urlValue = "/DTAOneApp/initiative/save"
    var submitData = this.initiativeForm.value;
    console.log(submitData);
    submitData['areaid'] = parseInt(submitData['areaid'])
    submitData['finimpactid'] = parseInt(submitData['finimpactid'])
    submitData['horipillarid'] = parseInt(submitData['horipillarid'])
    submitData['vertpillarid'] = parseInt(submitData['vertpillarid'])
    
    submitData['groupvalues'] = "{}"
    submitData['ilstatus'] = [{
      "ilstatusvalue": "{}"
    }]
    submitData['potential'] = [{
      "values": "{}"
    }]

    
   
    if(this.initiativeForm.valid){
      this.webservice.method(urlValue, submitData, 'postjson')
      .subscribe(result => {
        console.log(result);
        this.router.navigateByUrl('home')
      },Error=>{
        console.log(Error);
      })
    }else{
      console.log("Error in Form data");
    }
    

  }
  back(){
    this._location.back();
  }

  onValueEnter(event,pid,mid){
    console.log(event.target.value + " " + pid);
    //calculate for ebit = volume + nr
    
    // $('#pl'+pid+'ml').val('') 
    

  }

}
