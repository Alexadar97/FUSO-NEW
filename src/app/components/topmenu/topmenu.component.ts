import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToHome(){
    this.router.navigateByUrl('home')

  }

  logout(){
    var confirm = window.confirm("Press a button!");
    console.log(confirm);
    if(confirm){
      localStorage.setItem("username",null)
      this.router.navigateByUrl('login')
    }
    
  }

}
