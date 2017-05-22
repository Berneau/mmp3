import { Component, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { UserService } from './../services/user.service'
import { VendorService } from './../services/vendor.service'
import { TypeService } from './../services/type.service'
import { EventService } from './../services/event.service'

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

  constructor(private UserStore: UserService, private VendorStore: VendorService, private TypeStore: TypeService, private EventStore: EventService, private modalService: MzModalService) { }

  ngOnInit() {
  }

  openNewUserModal() {
    this.modalService.open(PostitFormComponent);
    // TODO: change
  }

  openNewCategoryModal() {
    this.modalService.open(CategoryFormComponent);
  }

  openNewTypeModal() {
    this.modalService.open(PostitFormComponent);
  }

  openNewPostitModal() {
    this.modalService.open(PostitFormComponent);
    // TODO: change
  }

  openNewEventModal() {
    this.modalService.open(PostitFormComponent);
    // TODO: change
  }

  newUser(form) {
    console.log("add User", form)
  }

  newVendor(form) {
    console.log("add Vendor", form)
  }

  newType(form) {
    this.TypeStore.addType(form.typeForm.value)
      .then(type => {
        if (!type) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Typ gespeichert.', 2000)
      })
  }

  newEvent(form) {
    this.EventStore.addEvent(form.eventForm.value)
      .then(event => {
        if (!event) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Event gespeichert.', 2000)
      })
  }

}
