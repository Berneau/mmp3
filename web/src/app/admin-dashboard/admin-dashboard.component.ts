import { Component, OnInit } from '@angular/core';

import { UserService } from './../services/user.service'
import { VendorService } from './../services/vendor.service'
import { CategoryService } from './../services/category.service'
import { TypeService } from './../services/type.service'
import { PostitService } from './../services/postit.service'
import { EventService } from './../services/event.service'


@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private UserStore: UserService, private VendorStore: VendorService, private CategoryStore: CategoryService, private TypeStore: TypeService, private PostitStore: PostitService, private EventStore: EventService, ) { }

  ngOnInit() {
  }

  newUser(form) {
    console.log("add User", form)
  }

  newVendor(form) {
    console.log("add Vendor", form)
  }

  newCategory(form) {
    this.CategoryStore.addCategory(form.categoryForm.value)
      .then(category => {
        if (!category) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Kategorie gespeichert.', 2000)
      })
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

  newPostit(form) {
    this.PostitStore.addPostit(null, form.postitForm.value)
      .then(postit => {
        if (!postit) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Schlachtbrett-Eintrag gespeichert.', 2000)
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
