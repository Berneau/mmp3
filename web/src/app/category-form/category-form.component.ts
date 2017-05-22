import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Category } from './../interfaces/category'
import { Type } from './../interfaces/type'

import { CategoryService } from './../services/category.service'
import { TypeService } from './../services/type.service'

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.less']
})
export class CategoryFormComponent extends MzBaseModal {

  categoryForm: FormGroup
  @Input() category: Category

  constructor(private fb: FormBuilder, private TypeStore: TypeService, private store: CategoryService) {
    super()
  }

  ngOnInit() {
    this.createForm()
    this.TypeStore.getTypes()
  }

  createForm() {
    if (this.category) {
      this.categoryForm = this.fb.group({
        name: this.category.name,
        typeUid: this.category.typeUid,
        imageUrl: this.category.imageUrl
      });
    }
    else {
      this.categoryForm = this.fb.group({
        name: '',
        typeUid: '',
        imageUrl: ''
      });
    }
  }

  newCategory() {
    this.store.addCategory(this.categoryForm.value)
      .then(category => {
        if (!category) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Kategorie gespeichert.', 2000)
      })
  }

  updateCategory(p) {
    this.store.updateCategory(p, this.categoryForm.value)
    .then(category => {
      if (!category) {
        Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
        return
      }
      Materialize.toast('Änderungen gespeichert.', 2000)
    })
  }

}
