import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router) { }

  showMenu = true;
  selectedItem = 1
  ngOnInit() {
    this.selectedItem = parseInt(localStorage.getItem('selected'));
  }

  routeTo(val,index){
    localStorage.setItem('selected',index)
  
    this.router.navigateByUrl(val)


  }

  toggle(){
    this.showMenu = !this.showMenu
  }
}
