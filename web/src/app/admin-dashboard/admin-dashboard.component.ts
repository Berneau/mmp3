import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newVendor(){
    console.log("add Vendor")
  }

  newCategory(){
    console.log("add Category")
  }

  newType(){
    console.log("add Type")
  }

  newPostit(){
    console.log("add Postit")
  }

  newEvent(){
    console.log("add Event")
  }

}
