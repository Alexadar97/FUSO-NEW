import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { WebserviceService } from '../../services/webservice.service'
import { UIserviceService } from '../../services/ui.service'


declare var $;

@Component({
  selector: 'app-new-measure',
  templateUrl: './new-measure.component.html',
  styleUrls: ['./new-measure.component.css']
})
export class NewMeasureComponent implements OnInit {
  initiativeForm: FormGroup
  numbervalidation = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
  elementsList = [];
  elementsList2 = [];
  elementsList3 = [];
  elementsList4 = [];
  elementsList5 = [];
  elementList6 = [];

  markerList = [];
  potentialList = [];
  horiId
  vertiId
  groupIdArr = []
  keyMasterMap = {}
  selectedVerticalId
  calcularFormulaString
  
  constructor(private fb: FormBuilder, private _location: Location, private ws: WebserviceService, private ui: UIserviceService) { }


  clearArr(){
    while (this.groupArr.length !== 0) {
      this.groupArr.removeAt(0)
    }
  }
  populateElementList5(ilStatusList) {
    var key = {}
    ilStatusList.map((status) => {
      key[status.baseline] = []
      this.elementsList5.push(this.ui.form(status.baseline, status.baseline, 2, "date", []))
    });
    const row = this.fb.group(key);
    this.statusArr.push(row)
    console.log(this.elementsList5);
  }

 

  listDataFetch(urlValue, submitData) {
    return new Promise((resolve, reject) => {
      this.ws.method(urlValue, submitData, 'post')
        .subscribe(list => {
          resolve(list)
        }, Error => {
          console.log(Error);
        })

    });
  }

  getGroupValues(){
   

   //horipillarid

   var urlValues = "/DTAOneApp/group/getGroupValues"
      //verticalid and group id is needed
      //groupIdArr - comma seperated
      var groupIdArr = this.groupIdArr[0];
  
      // this.ws.listDataFetch(urlValues,"vertpillarid="+parseInt(this.vertiId)+"&groupid="+groupIdArr).then((data:Array<any>)=>{
        this.ws.listDataFetch(urlValues,"vertpillarid="+parseInt(this.vertiId)+"&groupid="+parseInt(groupIdArr)+"&level="+1).then((data:Array<any>)=>{
     
          console.log(data)
          var elOptions = []
          data.map((dItem)=>{
            elOptions.push({
              id:dItem,name:dItem
            })
          })
          this.elementList6[0]["options"] = elOptions
        

        
  
        
        
  
      })
     
  }

  

  getGroupKeys(){
 


     var urlKeys = "/DTAOneApp/group/getGroupKeys"

     //horipillarid
       this.ws.listDataFetch(urlKeys,"horipillarid="+parseInt(this.horiId)).then((datalist:Array<any>)=>{
        
         var keys = [];
         var groupKey = {};
       
         console.log(datalist);
  
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

         console.log(keys);
         
         
         // this.rowForms.push(row);
         this.getGroupValues();
       })




     var urlPotential =  "/DTAOneApp/potential/list"
   
    var submitData3 = "horipillarid="+parseInt(this.horiId)
    this.ws.method(urlPotential, submitData3, 'post')
     .subscribe(dataList => {
      this.potentialList = dataList
      // this.buildCalcTable()
     });

  }
  populateGroup() {

    // var urlValue = "/DTAOneApp/horizontal/list";
    // var urlValue2 = "/DTAOneApp/vertical/list";
    var urlKeys = "/DTAOneApp/group/getGroupKeys"
    //horipillarid
    var urlValues = "/DTAOneApp/group/getGroupKeys"
    //verticalid and group id is needed
    var ilStatusUrl = "/DTAOneApp/ilstatus/list"
    var markerUrl = "/DTAOneApp/marker/list"
    var saveCommentsUrl = "/DTAOneApp/initiative/saveComments"
    //comments with similar to initiative save 

    var potentialUrl = "/DTAOneApp/potential/list"

    var promiseList = [];
    var submitData = {}

    // promiseList.push(this.listDataFetch(urlValue, submitData))
    // promiseList.push(this.listDataFetch(urlValue2, submitData))
    promiseList.push(this.listDataFetch(ilStatusUrl, submitData))
    promiseList.push(this.listDataFetch(markerUrl, submitData))
    // promiseList.push(this.listDataFetch(potentialUrl,submitData))

    // this.notify = true
    // this.notifyMessage = "Data Loading!"
    Promise.all(promiseList).then((dataArr) => {

      // this.notify = false
      // var horizontalList = dataArr[0]
      // var verticalList = dataArr[1]

      this.populateElementList5(dataArr[0])

      var marker = dataArr[1]
      var baselineYear = marker[0]['baseline']
      var endYear = marker[0]['marker']
      var markerSeries = []
      for (var i = baselineYear; i <= endYear; i++) {
        if (i != baselineYear) {
          markerSeries.push(i)
        } else {
          markerSeries.push("Baseline-" + i)
        }

      }

      this.markerList = markerSeries

      // this.getGroupKeys()


    })

  }

  getInitative(urlValue, submitData) {
    this.ws.method(urlValue, submitData, 'get')
      .subscribe(list => {
        console.log(list);
        // this.initiativeForm.patchValue(list)
        console.log(this.initiativeForm.value);
        // this.initiativeForm.patchValue({
        //   title: ''
        // })

        this.horiId = list.horipillarid;
        this.vertiId = list.vertpillarid;
        this.selectedVerticalId = list.vertpillarid;

        //based on hor - get the keys
        //base on vert - get the values

        this.getGroupKeys()

      }, Error => {
        console.log(Error);
      })
  }

  loadDraftInitData(){
    this.elementsList3 = [
      {
        title: "Responsible",
        cname: "responsible",
        spread: 6,
        type: "text"
      }, {
        title: "Initiative",
        cname: "initiativeid",
        spread: 6,
        type: "label",
        value:""+this.draftInit.title
      }]

      this.populateGroup()

  }

  fetchInitiativeList(){
    var urlValue = "/DTAOneApp/initiative/list";
    var submitData = "";
    this.ws.method(urlValue, submitData, 'post')
      .subscribe(list => {

        var options = [];
        list.map((item) => {
          options.push({ id: item.id, name: item.title })
        })

        this.elementsList3 = [
          {
            title: "Responsible",
            cname: "responsible",
            spread: 6,
            type: "text"
          }]

          this.populateGroup()

        // this.getInitative("/DTAOneApp/initiative/get/" + list[0]['id'], '');
      }, Error => {
        console.log(Error);
      })

    

    this.initiativeForm.get('initiativeid').valueChanges.subscribe(data => {

      console.log(data);
      this.getInitative("/DTAOneApp/initiative/get/" + data, '');

    });
  }

  execOnInit(){
    var req = Validators.compose([Validators.required]);
    var phone = Validators.compose([Validators.required, Validators.pattern(this.numbervalidation)]);
    this.initiativeForm = this.fb.group({
      title: [null, req],
      description: [null],
      initiativeid: [null],
      responsible: [null],
      ilstatus: this.fb.array([]),
      potentials: this.fb.array([]),
      comments: this.fb.array([]),
      groupvalues:this.fb.array([]),
      audit: this.fb.array([])
    });

    this.elementsList = [{
      title: "Measure Title",
      cname: "title",
      spread: 12,
      type: "text"
    }]

    if(this.isDraftInit){
      //
      this.loadDraftInitData();
    }else{
      this.fetchInitiativeList()

    }
    
  }

  isDraftInit = false;
  draftInit
  ngOnInit() {
    
   

    //check if there is draft init
    var draftInitiative = localStorage.getItem("draftinitiative")

    if(draftInitiative != null && draftInitiative != "null"){
      this.isDraftInit = true;
      this.draftInit = JSON.parse(draftInitiative);

    }else{
      this.isDraftInit = false
    }

    this.execOnInit();
    


  }

  cancelBtn(){
    this.back();
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
    console.log(arrayMap);

    // return arrayMap
    return JSON.stringify(arrayMap)

  }

  saveBtn() {
    console.log(this.initiativeForm.value);
    var urlValue = "/DTAOneApp/measure/save"
    var submitData = this.initiativeForm.value;

    // submitData['groupvalues'] = "{}"
    // submitData['ilstatus'] = [{
    //   "ilstatusvalue": "{}"
    // }]
    // submitData['potential'] = [{
    //   "values": "{}"
    // }]


    submitData['groupvalues'] = JSON.stringify(this.initiativeForm.value.groupvalues)

    submitData['ilstatus'] = [{
      "ilstatusvalue": JSON.stringify(this.initiativeForm.value.ilstatus)
    }]


    submitData['potentials'] = [{
      "values": this.fetchPotentialValues()
    }]

    console.log(submitData);
    console.log(JSON.stringify(submitData));
    

    if (this.initiativeForm.valid) {
      this.ws.method(urlValue, submitData, 'postjson')
        .subscribe(result => {
          console.log(result);
        }, Error => {
          console.log(Error);
        })
    } else {

    }


  }
  back() {
    this._location.back();
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

  


  populateNextLevel(level,options,groupId){
    if(this.elementList6.length-1 == level){
      console.log("out of range!")
      return
    }
    console.log("LEVEL >> "+level);
    var urlValues = "/DTAOneApp/group/getGroupValues"
    //verticalid and group id is needed
    //groupIdArr - comma seperated
    var selectedGroupId = this.groupIdArr[level];
    var selectedValue = $("#g"+level).val();
    var optionVal = ""

    // options.map((option)=>{
    //   if(option.id == selectedValue){
    //     optionVal = option.name
    //   }
    // })

    this.ws.listDataFetch(urlValues,"vertpillarid="+parseInt(this.selectedVerticalId)+"&groupid="+parseInt(selectedGroupId)+"&level="+(level+2)+"&levelvalue="+selectedValue).then((data:Array<any>)=>{
      
      console.log(data)
      var elOptions = []
      data.map((dItem)=>{
        elOptions.push({
          id:dItem,name:dItem
        })
      })
      this.elementList6[level+1]["options"] = elOptions
      
    

    }).catch((e)=>{
      console.log(e);
    })
  }

}
