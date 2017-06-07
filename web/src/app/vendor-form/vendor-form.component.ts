import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize';

import { Vendor } from './../interfaces/vendor'
import { User } from './../interfaces/user'

import { VendorService } from './../services/vendor.service'
import { UserService } from './../services/user.service'

import { UserFormComponent } from './../user-form/user-form.component'

import { PasswordValidation } from './../helpers/password-confirmation'

@Component({
  selector: 'vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.less']
})
export class VendorFormComponent extends MzBaseModal {

  vendorForm: FormGroup
  file: File
  farmFile: File
  @Input() vendor: Vendor
  @Input() user: User

  constructor(private store: VendorService, private fb: FormBuilder, private UserStore: UserService, private modalService: MzModalService) {
    super()
  }

  ngOnInit() {
    if (this.vendor && !this.user) {
      this.UserStore.getUser(this.vendor.userUid)
        .then(user => {
          this.user = user
        })
    }
    this.createForm()
  }

  createForm() {
    if (this.vendor) {
      this.vendorForm = this.fb.group({
        name: [this.vendor.name, Validators.required],
        userUid: [this.vendor.userUid, Validators.required],
        email: [this.vendor.email, Validators.required],
        description: this.vendor.description,
        imageUrl: this.vendor.imageUrl,
        imageKey: this.vendor.imageKey,
        farmImageUrl: this.vendor.farmImageUrl,
        farmImageKey: this.vendor.farmImageKey,
        subName: this.vendor.subName,
        website: this.vendor.website,
        tel: this.vendor.tel,
        city: this.vendor.address.city,
        street: this.vendor.address.street,
        zip: this.vendor.address.zip,
        lat: this.vendor.address.lat,
        long: this.vendor.address.long
      });
    }
    else {
      this.vendorForm = this.fb.group({
        name: ['', Validators.required],
        userUid: [this.user._id, Validators.required],
        email: [this.user.email, Validators.required],
        description: '',
        imageUrl: '',
        farmImageUrl: '',
        subName: '',
        website: '',
        tel: '',
        city: '',
        street: '',
        zip: '',
        lat: '',
        long: ''
      });
    }
  }

  fileOnChange(e: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> e;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
  }

  farmFileOnChange(e: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> e;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.farmFile = files[0];
  }

  submit() {
    if (this.vendorForm.valid) {
      if (this.vendor) {
        this.updateVendor(this.vendor)
      }
      else {
        this.newVendor()
      }
      this.modalComponent.close()
    }
    else {
      Materialize.toast('Kontrollieren Sie bitte alle Felder.', 2000)
    }
  }

  editUser() {
    this.modalService.open(UserFormComponent, { user: this.user });
  }

  newVendor() {
    this.store.addVendor(this.vendorForm.value, this.file, this.farmFile)
      .then(vendor => {
        if (!vendor) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Produzent gespeichert.', 2000)
      })
  }

  updateVendor(v) {
    this.store.updateVendor(v, this.vendorForm.value, this.file, this.farmFile)
      .then(vendor => {
        if (!vendor) {
          Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Änderungen gespeichert.', 2000)
      })
  }
}
