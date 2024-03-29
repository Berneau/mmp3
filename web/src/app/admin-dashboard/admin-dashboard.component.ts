import { Component, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { UserFormComponent } from './../user-form/user-form.component'
import { CategoryFormComponent } from './../category-form/category-form.component'
import { TypeFormComponent } from './../type-form/type-form.component'
import { PostitFormComponent } from './../postit-form/postit-form.component'
import { EventFormComponent } from './../event-form/event-form.component'

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private modalService: MzModalService) { }

  ngOnInit() {
    $('.button-collapse').sideNav('hide');
    $(document).ready(function() {
      $('ul.tabs').tabs();
    });
  }

  openNewUserModal() {
    this.modalService.open(UserFormComponent);
  }

  openNewCategoryModal() {
    this.modalService.open(CategoryFormComponent);
  }

  openNewTypeModal() {
    this.modalService.open(TypeFormComponent);
  }

  openNewPostitModal() {
    this.modalService.open(PostitFormComponent);
  }

  openNewEventModal() {
    this.modalService.open(EventFormComponent);
  }
}
