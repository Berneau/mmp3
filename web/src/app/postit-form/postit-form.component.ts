import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Postit } from './../interfaces/postit'
import { Vendor } from './../interfaces/vendor'

@Component({
  selector: 'postit-form',
  templateUrl: './postit-form.component.html',
  styleUrls: ['./postit-form.component.less']
})
export class PostitFormComponent implements OnInit {

  postitForm: FormGroup
  @Input() postit: Postit
  @Input() vendor: Vendor

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.postit) {
      this.postitForm = this.fb.group({
        name: this.postit.name,
        description: this.postit.description,
        imageUrl: this.vendor.tel
      });
    }
    else {
      this.postitForm = this.fb.group({
        name: '',
        description: '',
        imageUrl: ''
      });
    }
  }

}
