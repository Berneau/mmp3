import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Postit } from './../interfaces/postit'
import { Vendor } from './../interfaces/vendor'

import { PostitService } from './../services/postit.service'

@Component({
  selector: 'postit-form',
  templateUrl: './postit-form.component.html',
  styleUrls: ['./postit-form.component.less']
})
export class PostitFormComponent extends MzBaseModal {

  postitForm: FormGroup
  postit: Postit
  vendor: Vendor

  constructor(private fb: FormBuilder, private store: PostitService) {
    super()
  }

  ngOnInit() {
    this.createForm()
    $('#postit-image').change('input', (e) => {
      let imageUrl = $(e.target).val()
      this.postitForm.patchValue({imageUrl: imageUrl})
    })
  }

  createForm() {
    if (this.postit) {
      this.postitForm = this.fb.group({
        name: this.postit.name,
        confirmed: false,
        vendorId: { value: this.vendor != undefined ? this.vendor._id : null, disabled: true },
        description: this.postit.description,
        location: this.postit.location,
        imageUrl: this.postit.imageUrl
      });
    }
    else {
      this.postitForm = this.fb.group({
        name: '',
        confirmed: false,
        vendorId: { value: this.vendor != undefined ? this.vendor._id : null, disabled: true },
        description: '',
        location: '',
        imageUrl: ''
      });
    }
  }

  newPostit() {
    this.store.addPostit(this.vendor, this.postitForm.value)
      .then(postit => {
        if (!postit) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Schlachtbrett-Eintrag gespeichert.', 2000)
      })
  }

  updatePostit(p) {
    this.store.updatePostit(this.vendor, p, this.postitForm.value)
    .then(postit => {
      if (!postit) {
        Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
        return
      }
      Materialize.toast('Änderungen gespeichert.', 2000)
    })
  }

}
