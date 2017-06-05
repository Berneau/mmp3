import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize';

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
  file: File
  @Input() category: Category

  constructor(private store: CategoryService, private fb: FormBuilder, private TypeStore: TypeService, private modalService: MzModalService) {
    super()
  }

  ngOnInit() {
    this.createForm()
    this.TypeStore.getTypes()
    $('#category-image').change('input', (e) => {
      let imageUrl = $(e.target).val()
      this.categoryForm.patchValue({ imageUrl: imageUrl })
    })
  }

  createForm() {
    if (this.category) {
      this.categoryForm = this.fb.group({
        name: [this.category.name, [Validators.required]],
        typeUid: [this.category.typeUid, [Validators.required]],
        imageUrl: this.category.imageUrl
      });
    }
    else {
      this.categoryForm = this.fb.group({
        name: ['', [Validators.required]],
        typeUid: ['', [Validators.required]],
        imageUrl: ''
      });
    }
  }

  fileOnChange(e: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> e;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
  }

  submit() {
    if (this.categoryForm.valid) {
      if (this.category) {
        this.updateCategory(this.category)
      }
      else {
        this.newCategory()
      }
      this.modalComponent.close()
    }
    else {
      Materialize.toast('Kontrollieren Sie bitte alle Felder.', 2000)
    }
  }

  newCategory() {
    this.store.addCategory(this.categoryForm, this.file)
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
