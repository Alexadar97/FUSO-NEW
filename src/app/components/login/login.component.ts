import { Component, OnInit } from '@angular/core';
import {trigger,transition,style,animate} from '@angular/animations'
import {Router} from '@angular/router'

import { WebserviceService } from '../../services/webservice.service'


declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {

  showModal = false
  constructor(private router:Router,private webservice: WebserviceService) { }

  ngOnInit() {
    localStorage.setItem('selected',"1");
  }

  reqAccess(){
    this.showModal = true
  }

  login(){
    //do user validation
    var loginUrl =  "/DTAOneApp/auth/login/"
    //shortid, password  in json
    var submitData = {shortid:$("#shortID").val(),password:$("#password").val()}

    this.webservice.method(loginUrl, submitData, 'postjson')
        .subscribe(result => {
          console.log(result);
          localStorage.setItem("username",result['username'])
          
          if(result.status == 1){
            this.router.navigate(['dashboard']);
          }else{
            alert("Login error! Please verify your credentials.")
          }

        }, Error => {
          console.log(Error);
        })



  }

  submitRequest(){

    this.showModal = false
  }

}
