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

  newVendor(form){
    console.log("add Vendor", form)
  }

  newCategory(form){
    console.log("add Category", form)
  }

  newType(form){
    console.log("add Type", form)
  }

  newPostit(form){
    console.log("add Postit", form)
  }

  newEvent(form){
    console.log("add Event", form)
  }

}
