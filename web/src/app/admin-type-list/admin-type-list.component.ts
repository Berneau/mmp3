import { Component, Input, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { Type } from './../interfaces/type'

import { TypeService } from './../services/type.service'

import { TypeFormComponent } from './../type-form/type-form.component'
import { DeleteConfirmationComponent } from './../delete-confirmation/delete-confirmation.component'

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
    this.modalService.open(TypeFormComponent, { type: this.selectedType });
  }

  deleteType(t) {
    this.modalService.open(DeleteConfirmationComponent, { name: t.name, message: 'Typen können nicht gelöscht werden, wenn sie von Kategorien benutzt werden!' })
    $('delete-confirmation #deletionConfirmedButton').on('click', () => {
      this.store.deleteType(t._id)
        .then(success => {
          if (!success) {
            Materialize.toast('Fehlgeschlagen.', 2000)
            return
          }
          Materialize.toast('Eintrag gelöscht.', 2000)
        })
    })
  }

}
