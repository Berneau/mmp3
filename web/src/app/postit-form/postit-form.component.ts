import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Postit } from './../interfaces/postit'
import { Vendor } from './../interfaces/vendor'

import { PostitService } from './../services/postit.service'
import { LoginService } from './../services/login.service'

@Component({
  selector: 'postit-form',
  templateUrl: './postit-form.component.html',
  styleUrls: ['./postit-form.component.less']
})
export class PostitFormComponent extends MzBaseModal {

  postitForm: FormGroup
  postit: Postit
  vendor: Vendor
  file: File

  constructor(private store: PostitService, private fb: FormBuilder, private LoginStore: LoginService) {
    super()
  }

  ngOnInit() {
    this.createForm()
    $('#postit-image').change('input', (e) => {
      let imageUrl = $(e.target).val()
      this.postitForm.patchValue({ imageUrl: imageUrl })
    })
  }

  createForm() {
    if (this.postit) {
      this.postitForm = this.fb.group({
        name: [this.postit.name, [Validators.required]],
        confirmed: [false, [Validators.required]],
        vendorId: { value: this.vendor != undefined ? this.vendor._id : null, disabled: true },
        description: this.postit.description,
        location: this.postit.location,
        imageUrl: this.postit.imageUrl,
        imageKey: this.postit.imageKey
      });
    }
    else {
      this.postitForm = this.fb.group({
        name: ['', [Validators.required]],
        confirmed: [false, [Validators.required]],
        vendorId: { value: this.vendor != undefined ? this.vendor._id : null, disabled: true },
        description: '',
        location: '',
        imageUrl: '',
        imageKey: ''
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
    if (this.postitForm.valid) {
      if (this.postit) {
        this.updatePostit(this.postit)
      }
      else {
        this.newPostit()
      }
      this.modalComponent.close()
    }
    else {
      Materialize.toast('Kontrollieren Sie bitte alle Felder.', 2000)
    }
  }

  newPostit() {
    this.store.addPostit(this.vendor, this.postitForm.value, this.file)
      .then(postit => {
        if (!postit) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Schlachtbrett-Eintrag gespeichert.', 2000)
      })
  }

  updatePostit(p) {
    this.store.updatePostit(this.vendor, p, this.postitForm.value, this.file)
      .then(postit => {
        if (!postit) {
          Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Änderungen gespeichert.', 2000)
      })
  }

}
