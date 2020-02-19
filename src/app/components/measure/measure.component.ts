import { Component, OnInit } from '@angular/core';
import {trigger,transition,style,animate} from '@angular/animations'

import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { WebserviceService } from '../../services/webservice.service'
import { UIserviceService } from '../../services/ui.service'

declare var $;
@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css'],
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
export class MeasureComponent implements OnInit {
  initiativeForm:FormGroup
  calctable:FormGroup
  numbervalidation = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
  elementsList = [];
  elementsList2 = [];
  elementsList3 = [];
  elementsList4 = [];
  elementsList5 = [];
  elementList6 = [];

  measureList = [];

  tagDropdownList = []
  selectedItemsTags = []


  auditCards = []
  dropdownList = []
  selectedItems = []
  dropdownSettings

  selectedDropDown = []

  tagDropDown = []

  potentialStatus = 0
  totalMeasureCount = 0


  notifyMessage = "";
  notify = false;
  fineUrl = "/DTAOneApp/findrivermap/list"
  //horipillarid


  horizontalList = [];

  groupIdArr = []
  keyMasterMap = {}
  markerList = []
  potentialList = []

  //for edit initiative
  initiativeId
  userId

  respL2Subscription
  respL3Subscription
  respL4Subscription

  calcularFormulaString = ""

  constructor(private fb: FormBuilder,private _location:Location,private ws:WebserviceService,private ui:UIserviceService,private router:Router) {
    this.auditCards = [{date:"12 Jan 2020",time:"12:00 pm",msg:"Fields in Potentials are updated by Mani Mohan"}]
   }

   onTagSelect(){


   }



  populateElementList5(ilStatusList){
    var key = {}
    ilStatusList.map((status) => {
      key[status.baseline] = []
      this.elementsList5.push(this.ui.form(status.baseline, status.baseline, 2, "date", []))
    });
    const row = this.fb.group(key);
    this.statusArr.push(row)
  }

  respChanged(event,index){
    console.log(event);

  }


  populateElementList2(horizontalList,verticalList,areaList,currencyList,ilStatusList,marker){
    this.elementsList2 = [
      this.ui.formRequired("Horizontal Pillar", "horipillarid", 6, "select", horizontalList),
      this.ui.formRequired("Vertical Pillar", "vertpillarid", 6, "select", verticalList),
      this.ui.formRequired("Financial Impact", "finimpactid", 4, "select", []),
      this.ui.formRequired("Area", "areaid", 4, "select", areaList),
      this.ui.formRequired("Currency", "currencyid", 4, "select", currencyList),
    ]




    this.populateElementList5(ilStatusList)

    var baselineYear = marker[0]['baseline']
    var endYear = marker[0]['marker']
    var markerSeries = []
    for(var i=baselineYear;i<=endYear;i++){
      // if(i!=baselineYear){
        markerSeries.push(i)
      // }else{
      //   markerSeries.push("Baseline-"+i)
      // }

    }

    this.markerList = markerSeries
    // this.potentialList = potentialList

  }

  listDataFetch(urlValue,submitData){
    return new Promise((resolve,reject)=>{
      this.ws.method(urlValue, submitData, 'post')
      .subscribe(list => {
        resolve(list)
      },Error=>{
        console.log(Error);
      })

    });
  }

  onItemSelect(item: any,i2,options) {



    console.log(this.selectedItems);
    var selectedValues = this.selectedItems[i2]

    this.populateNextLevel(i2,selectedValues)



    //if all group values are provided, then create a measure entity
    // this.measureList = [1,2,3,4,5]
    // this.measureList = [];

    // this.selectedItems.map((selectItem,index)=>{

    // })
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getLetter(word){
    if(word == '' || word == null || word == undefined){
      return ''
    }else{
      return word.split('')[0].toUpperCase();
    }

  }

  tagoptions = []

  populateTags(){
    var urlValue =  "/DTAOneApp/taggroup/list"
    var submitData2 = ""

    this.ws.listDataFetch(urlValue,submitData2).then((result:Array<Object>)=>{

        var tagArr = []
        result.map((obj)=>{
          obj['tags'].map((tObj)=>{
            tagArr.push(tObj)
          })
        })



        this.tagDropdownList = [

          ];

        //convert tagArr into tagDropdownList


        this.tagoptions = tagArr;


        tagArr.map((tagData)=>{
          this.tagDropdownList.push({
            item_id:tagData.id,
            item_text:tagData.name
          })
        })



    });

  }


  ngOnInit() {

    // this.measureList = [{name:"Test",lead:"Praveen"},{name:"Test",lead:"Praveen"},{name:"Test",lead:"Praveen"}]

    this.markerList = [];
    this.potentialList = [];

    this.dropdownList = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.selectedItems = []
    this.selectedItems.push([])

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

    promiseList.push(this.ws.listDataFetch(urlValue,submitData))
    promiseList.push(this.ws.listDataFetch(urlValue2,submitData))
    promiseList.push(this.ws.listDataFetch(urlValue3,submitData))
    promiseList.push(this.ws.listDataFetch(urlValue4,submitData))
    promiseList.push(this.ws.listDataFetch(ilStatusUrl,submitData))
    promiseList.push(this.ws.listDataFetch(markerUrl,submitData))
    // promiseList.push(this.listDataFetch(potentialUrl,submitData))

    // this.notify = true
    // this.notifyMessage = "Data Loading!"
    Promise.all(promiseList).then((dataArr)=>{

      // this.notify = false
      this.populateElementList2(dataArr[0], dataArr[1], dataArr[2], dataArr[3],dataArr[4],dataArr[5])
    })


    this.createForm();



    this.elementsList = [
      this.ui.formRequired("Initiative Title", "title", 12, "text", []),
      this.ui.formRequired("Description", "description", 12, "textarea", [])
    ]

    this.elementsList3 = [
      this.ui.form("L2", "respl2", 4, "text", []),
      this.ui.form("L3", "respl3", 4, "text", []),
      this.ui.form("L4", "respl4", 4, "text", []),
    ]

    // this.elementsList4 = [
    //   this.ui.form("Region", "title", 2, "select", []),
    //   this.ui.form("Country", "title", 2, "select", []),
    //   this.ui.form("Type", "title", 2, "select", []),
    //   this.ui.form("RC/SC", "title", 2, "select", []),
    //   this.ui.form("Get?", "title", 2, "select", []),
    // ]


   //horipillarid

  this.onHorizontalValueChange()
  this.onVerticalValueChange();

  this.populateTags();






  }

  private createForm() {
    var req = Validators.compose([Validators.required]);
    var phone = Validators.compose([Validators.required, Validators.pattern(this.numbervalidation)]);
    this.initiativeForm = this.fb.group({
      title: ["", req],
      description: ["", req],
      tags: ["", req],
      horipillarid: [null, req],
      currencyid: [null],
      finimpactid: [null, req],
      areaid: [null, req],
      respl2: [""],
      respl3: [""],
      respl4: [""],
      vertpillarid: [null],
      groupvalues: this.fb.array([]),
      ilstatus: this.fb.array([]),
      potentials: this.fb.array([]),
    });
  }

  clearArr(){
    while (this.groupArr.length !== 0) {
      this.groupArr.removeAt(0)
    }
  }

  searchUserByResp(id){
    var userinputId = "#uSearch"+id
    var urlValue =  "/DTAOneApp/auth/searchUser"
    var submitData = "shortid="+$(userinputId).val()

    if(id == 1){
      submitData = "shortid=l2"
    }else if(id == 2){
      submitData = "shortid=l3"
    }else if(id == 3){
      submitData = "shortid=l4"
    }
    
    this.ws.listDataFetch(urlValue,submitData).then((result)=>{
      console.log(result)
      //result shortid - to save
      //result username - to display
      $(userinputId).val(""+result['shortid'])
      
    })
  }

  setValue(event,i){
    console.log(event)
    if(i ==0){
      this.initiativeForm.patchValue({'respl2':event.srcElement.value})
    }else if(i ==1){
      this.initiativeForm.patchValue({'respl3':event.srcElement.value})
    }else if(i ==2){
      this.initiativeForm.patchValue({'respl4':event.srcElement.value})
    }
  }

  //Listens for change in horipillarid
  dataListArr
  onHorizontalValueChange(){

   this.initiativeForm.get('horipillarid').valueChanges.subscribe(data=>{


    var submitData = "horipillarid="+parseInt(data)
    this.ws.method(this.fineUrl, submitData, 'post')
     .subscribe(finData => {

       // var finDataObj = this.elementsList2[2]
       this.elementsList2[2] = this.ui.formRequired("Financial Impact","finimpactid",4,"select",finData)
     },Error=>{
       console.log(Error);
     });


     var urlKeys = "/DTAOneApp/group/getGroupKeys"

   //horipillarid
     this.ws.listDataFetch(urlKeys,"horipillarid="+parseInt(data)).then((datalist:Array<any>)=>{

      this.dataListArr = datalist


      //
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

    var submitData3 = "horipillarid="+parseInt(data)
    this.ws.method(urlPotential, submitData3, 'post')
     .subscribe(dataList => {
      this.potentialList = dataList

     });

    //  /DTAOneApp/calculations/get/{horipillarid}/{type}
    this.fetchCalculation(data);


  },Error=>{
    console.log(Error);
  });

  }

  private fetchCalculation(data: any) {
    this.ws.listDataGet("/DTAOneApp/calculations/get/" + parseInt(data) + "/1", "").then((datalist: Array<any>) => {


      var newString = ''
      datalist['formula'].split('').map((s,index)=>{
        // console.log(s + "    "+index + "     " + datalist['formula'].charCodeAt(index) );
        if(datalist['formula'].charCodeAt(index) === 8220 || datalist['formula'].charCodeAt(index) === 8221){
          newString = newString+'"';
        }else{
          newString = newString+s;

        }
      })

      console.log(newString)



      var t1 = newString.replace(/\{{/g,'{');
      var t2 = t1.replace(/\}}/g,'}');

      //.replace(/\'/g,'"');
      // var jsonstring =datalist['formula'].replace(/\”/g,'"')
      // var temp = jsonstring.replace(/\“/g,'"')
      // console.log(jsonstring);

      var formulat = JSON.parse(t2)
      console.log(formulat)

      this.calcularFormulaString = formulat
    });
  }


  populateNextLevel(level,item){
    if(this.elementList6.length-1 == level){
      console.log("out of range!")
      console.log(this.selectedItems);
      this.totalMeasureCount = 1;
      this.selectedItems.map((selected)=>{
        console.log(selected);
        if(selected != undefined && selected.length > this.totalMeasureCount){
          this.totalMeasureCount = selected.length
        }
      })

      console.log(this.totalMeasureCount);
      for(var i=0;i<this.totalMeasureCount;i++){
        this.measureList.push(i)
        console.log(this.measureList.length);
      }
      if(this.totalMeasureCount > 1){
        

      }
      return
    }

    //FOR TESTING
      // for(var i=0;i<3;i++){
      //   this.measureList.push(i)
      //   console.log(this.measureList.length);
      // }

    var urlValues = "/DTAOneApp/group/getGroupValues"
    //verticalid and group id is needed
    //groupIdArr - comma seperated
    var selectedGroupId = this.groupIdArr[level+1];
    var selectedValue;
    var optionVal = ""

    selectedValue = item



    var promiseList = []
    var selectedValueArr = selectedValue
    var selectedLevel = this.dataListArr[level+1]['level']

    selectedValueArr.map((selVal)=>{
      promiseList.push(this.ws.listDataFetch(urlValues,"vertpillarid="+parseInt(this.selectedVerticalId)+"&groupid="+parseInt(selectedGroupId)+"&level="+(selectedLevel)+"&levelvalue="+selVal))
    })

    Promise.all(promiseList).then((dataVals)=>{
      var elOptions = []
      dataVals.map((data)=>{
        console.log(data)

        data.map((dItem)=>{
          if(dItem == null){
            dItem = "Yes"
          }
          elOptions.push({
            id:dItem,
            name:dItem,
            item_id:dItem,
            item_text:dItem
          })
        })
      })

      this.elementList6[level+1]["options"] = elOptions
      this.dropdownList[level+1] = elOptions




    })


  }

  selectedVerticalId
  //Listens for changes in vertipillarid
  onVerticalValueChange(){
    this.initiativeForm.get('vertpillarid').valueChanges.subscribe(verticalId=>{
      this.selectedVerticalId = verticalId;

      var urlValues = "/DTAOneApp/group/getGroupValues"
      //verticalid and group id is needed
      //groupIdArr - comma seperated
      var groupIdArr = this.groupIdArr[0];


      this.ws.listDataFetch(urlValues,"vertpillarid="+parseInt(verticalId)+"&groupid="+parseInt(groupIdArr)+"&level="+1).then((data:Array<any>)=>{

        console.log(data)
        var elOptions = []
        data.map((dItem)=>{
          elOptions.push({
            id:dItem,
            name:dItem,
            item_id:dItem,
            item_text:dItem,
            level:1
          })
        })
        
        this.elementList6[0]["options"] = elOptions
        this.dropdownList.push(elOptions)





      }).catch((e)=>{
        console.log(e);
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

  cancelBtn(){
    this.back();
  }
  saveBtn2(){
    console.log(this.initiativeForm.value);
  }

  modifyGroupValues(groupValues){
    var sample = [{"groupid":1,"values":{"level1":"india","level2":"india"}},{"groupid":2,"values":{"level1":"SC/RC"}}]
    console.log(groupValues);
    //[{Region:["Region1"],Country:["MFTA","Russia"]}]
    console.log(this.dataListArr)

    
  }

  saveBtn(){

    var urlValue = "/DTAOneApp/initiative/save"
    var submitData = this.initiativeForm.value;
    submitData['areaid'] = parseInt(submitData['areaid'])
    submitData['finimpactid'] = parseInt(submitData['finimpactid'])
    submitData['horipillarid'] = parseInt(submitData['horipillarid'])
    submitData['vertpillarid'] = parseInt(submitData['vertpillarid'])
    submitData['currencyid'] = parseInt(submitData['currencyid'])

    var tags = JSON.stringify(submitData["tags"])
    submitData['tags'] = tags



    submitData['groupvalues'] = this.modifyGroupValues(this.initiativeForm.value.groupvalues)
    // JSON.stringify(this.initiativeForm.value.groupvalues)

    submitData['ilstatus'] = [{
      "ilstatusvalue": JSON.stringify(this.initiativeForm.value.ilstatus)
    }]



    submitData['potentials'] = [{
      "values": this.fetchPotentialValues()
    }]




    var username = localStorage.getItem("username")
    submitData['createdby'] = username;

    if(this.initiativeForm.valid){
      this.ws.method(urlValue, submitData, 'postjson')
      .subscribe(result => {

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

  findOperandValue(operand,markerId,oprM){
    var tempOperand = 0;
    if (operand.hasOwnProperty('potentialid')) {
      //get the value
      tempOperand = parseFloat($("#pl" + operand["potentialid"] + "ml" + oprM).val())
      if(isNaN(tempOperand)){
        tempOperand=0
      }


    } else {
      //calculate the operation and get the value
      tempOperand = (this.calcFormula(operand, markerId))
    }

    return tempOperand
  }


  calcFormula(formulaString,markerId){
    // var markerId = 1


    // var formulaString = {"operation":"-","operands":[{"year":"curr","potentialid":1},{"year":"prev","potentialid":1}]};
    var operation = formulaString['operation']
    var operands = formulaString['operands']

    var perand_1 = 0
    var perand_2 = 0

    var oprM1 = operands[0]["year"] == "curr"?markerId:markerId-1
    var oprM2 = operands[1]["year"] == "curr"?markerId:markerId-1


    perand_1 = this.findOperandValue(operands[0],markerId,oprM1)
    perand_2 = this.findOperandValue(operands[1],markerId,oprM2)




      if (operands[1].hasOwnProperty('potentialid')) {
        //get the value
        perand_2 = parseFloat($("#pl" + operands[1]["potentialid"] + "ml" + oprM2).val())
        if(isNaN(perand_2)){
          perand_2=0
        }
      } else {
        //calculate the operation and get the value
        perand_2 = (this.calcFormula(operands[1], markerId))
      }


    var answer = 0
    switch(operation){
      case "+":
        answer = perand_1 +  perand_2
        break
        case "-":
          answer = perand_1 -  perand_2
        break
        case "*":
          answer = perand_1 *  perand_2
        break
        case "/":
          answer = perand_1 /  perand_2
        break
    }

    if(oprM1 == 0){
      console.log(JSON.stringify(formulaString));
      console.log(">>>>>>>>>"+perand_1 +"______"+perand_2)
      console.log(answer);

    }

    return answer

  }

  ebitP
  onValueEnter(event,pid,mid,potentialId){
    pid = potentialId

    this.markerList.map((ml, index) => {
      var solution = this.calcFormula(this.calcularFormulaString, index);

      var size = this.potentialList.length - 1;
      // this.addTableRow(4)


      //update the respective YOY
      //find prev year
      var currEbit = solution;
      var prevEbit = 0
      if (index != 0) {
        prevEbit = $("#pl" + size + "ml" + (index - 1)).val();
      }

      var diff = currEbit - prevEbit
      $(".cipl" + size + "ml" + index).val(solution)
      $(".cipl" + (size - 1) + "ml" + index).val(diff);

    })


  }

  fetchPotentialValues(){
    var psize = this.potentialList.length-1; //3
    var msize = this.markerList.length; //4

    var arrayMap = [];



    // for(var i=0;i<psize;i++){
      for(var j=0;j<msize;j++){

        var outputObj = {}

        outputObj["year"] = this.markerList[j];
        // outputObj["Ebit"] = $("#pl"+psize + "ml" + j).val();
        // outputObj["YoYEbit"] = $("#pl"+(psize-1) + "ml" + j).val();
        outputObj["YoYEbit_RiskAdj"] = "";

         this.potentialList.map((pot,index)=>{
              outputObj[pot.title] = $("#pl"+index+"ml"+j).val()
         })


        arrayMap.push(outputObj)

      }
    // }


    // return arrayMap
    return JSON.stringify(arrayMap)

  }

  addComment(){
    var comment = $("#commentText").val()
    var urlValue =  "/DTAOneApp/initiative/saveComments"
    var submitData = {}

    submitData["id"] = this.initiativeId
    submitData["comments"] = {
      comments:comment,
      name:this.userId
    }

    submitData["id"] = 27
    

    this.ws.listDataFetchJson(urlValue,submitData).then((result)=>{
      console.log(result)
    })

  }

  notifyState
  notifyTest(){
    this.notify = true
    this.notifyState = "success";   //success , error
    this.notifyMessage = "Notification message"
    setTimeout( () => {
      this.notify = false
      console.log("function called");

   }, 200000);

  }


  ngOnDestroy(){
    //use ngOnDestroy
    //use subsink  : npm install subsink
    // this.respL2Subscription.unsubscribe();
  }

  editBtn(){
    //save the initiative in the localstorage
    localStorage.setItem("draftinitiative",JSON.stringify(this.initiativeForm.value))
    this.router.navigateByUrl('newMeasure')
  }

}
