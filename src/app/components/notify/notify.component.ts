import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  @Input() message;
  @Input() state;
  
  constructor() { }

  ngOnInit() {
   
    
  }

  ngOnChanges(changes){
    // console.log(changes['state'])
  }

}
