import { Component, Input, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { Type } from './../interfaces/type'

import { TypeService } from './../services/type.service'

import { TypeFormComponent } from './../type-form/type-form.component'

@Component({
  selector: 'admin-type-list',
  templateUrl: './admin-type-list.component.html',
  styleUrls: ['./admin-type-list.component.less']
})
export class AdminTypeListComponent implements OnInit {

  selectedType: Type

  constructor(private store: TypeService, private modalService: MzModalService) { }

  ngOnInit() {
    this.store.getTypes()
  }

  selectType(type: Type) {
    this.selectedType = type
    this.modalService.open(TypeFormComponent, {type: this.selectedType});
  }

  deleteType(t) {
    this.store.deleteType(t._id)
      .then(success => {
        if (!success) {
          Materialize.toast('Fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Eintrag gelöscht.', 2000)
      })
  }

}
