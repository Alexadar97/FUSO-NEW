import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/Rx';
import { Router } from '@angular/router';
declare var $;
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/add/operator/finally';

@Injectable()
export class UIserviceService {

    
    constructor(private http: Http, private router: Router, private spinner: NgxSpinnerService) {
       
    }


    form(title,desc,spread,type,options){
        return {
            title:title,
            cname:desc,
            spread:spread,
            type:type,
            options:options
        }
    }

    formMin(title,desc,spread,type,options,min){
        return {
            title:title,
            cname:desc,
            spread:spread,
            type:type,
            options:options,
            min:min
        }
    }

    formValue(title,desc,spread,type,value){
        return {
            title:title,
            cname:desc,
            spread:spread,
            type:type,
            value:value
        }
    }

    formRequired(title,desc,spread,type,options){
        return {
            title:title,
            cname:desc,
            spread:spread,
            type:type,
            options:options,
            required:"true"
        }
    }
    

}
