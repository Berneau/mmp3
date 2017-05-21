import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Type } from './../interfaces/type'

@Component({
  selector: 'type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.less']
})
export class TypeFormComponent implements OnInit {

  typeForm: FormGroup
  @Input() type: Type

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.type) {
      this.typeForm = this.fb.group({
        name: this.type.name
      });
    }
    else {
      this.typeForm = this.fb.group({
        name: ''
      });
    }
  }

}
