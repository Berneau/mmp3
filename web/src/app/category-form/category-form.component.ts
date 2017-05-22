import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Category } from './../interfaces/category'
import { Type } from './../interfaces/type'

import { TypeService } from './../services/type.service'

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.less']
})
export class CategoryFormComponent extends MzBaseModal {

  categoryForm: FormGroup
  @Input() category: Category

  constructor(private fb: FormBuilder, private TypeStore: TypeService) {
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

}
