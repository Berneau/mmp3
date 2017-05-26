import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Type } from './../interfaces/type'

import { TypeService } from './../services/type.service'

@Component({
  selector: 'type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.less']
})
export class TypeFormComponent extends MzBaseModal {

  typeForm: FormGroup
  @Input() type: Type

  constructor(private fb: FormBuilder, private store: TypeService) {
    super()
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.type) {
      this.typeForm = this.fb.group({
        name: [this.type.name, Validators.required]
      });
    }
    else {
      this.typeForm = this.fb.group({
        name: ['', Validators.required]
      });
    }
  }

  submit() {
    if (this.typeForm.valid) {
      if (this.type) {
        this.updateType(this.type)
      }
      else {
        this.newType()
      }
      this.modalComponent.close()
    }
    else {
      Materialize.toast('Kontrollieren Sie bitte alle Felder.', 2000)
    }
  }

  newType() {
    this.store.addType(this.typeForm.value)
      .then(type => {
        if (!type) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Typ gespeichert.', 2000)
      })
  }

  updateType(p) {
    this.store.updateType(p, this.typeForm.value)
    .then(type => {
      if (!type) {
        Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
        return
      }
      Materialize.toast('Änderungen gespeichert.', 2000)
    })
  }

}
