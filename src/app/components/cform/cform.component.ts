import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cform',
  templateUrl: './cform.component.html',
  styleUrls: ['./cform.component.css']
})
export class CformComponent implements OnInit {
  @Input() title;
  @Input() parentForm:FormGroup
  @Input() formCName
  @Input() spread;
  @Input() type;
  @Input() options;
  @Input() isRequired;
  @Input() settings;
  @Input() value;
  @Input() min;
  message;
  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  isDisabled = true
  
  minDate = {}

  constructor() { }

  ngOnInit() {
    this.message = this.title + " is required"

    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    if(this.options && this.type =='multiselect'){
      this.options.map((option)=>{
        this.dropdownList.push({
          item_id:option.id,
          item_text:option.name
        })
      })

    }

  
    

    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];

    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


   
    this.minDate = new Date('2020/02/10')
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  isValid(){
    return !this.parentForm.controls[this.formCName].valid && this.parentForm.controls[this.formCName].touched
}

}
