import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Vendor } from './../interfaces/vendor'
import { User } from './../interfaces/user'

import { VendorService } from './../services/vendor.service'

@Component({
  selector: 'vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.less']
})
export class VendorFormComponent extends MzBaseModal {

  vendorForm: FormGroup
  @Input() vendor: Vendor
  @Input() user: User

  constructor(private fb: FormBuilder, private store: VendorService) {
    super()
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.vendor) {
      this.vendorForm = this.fb.group({
        name: [this.vendor.name, Validators.required],
        userUid: [this.vendor.userUid, Validators.required],
        email: [{ value: this.vendor.email, disabled: true }, Validators.required],
        description: this.vendor.description,
        imageUrl: this.vendor.imageUrl,
        farmImageUrl: this.vendor.farmImageUrl,
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
        email: { value: this.user.email, disabled: true },
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

  newVendor() {
    this.store.addVendor(this.vendorForm.value, this.user.email)
      .then(vendor => {
        if (!vendor) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Produzent gespeichert.', 2000)
      })
  }

  updateVendor(v) {
    this.store.updateVendor(v, this.vendorForm.value)
    .then(vendor => {
      if (!vendor) {
        Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
        return
      }
      Materialize.toast('Änderungen gespeichert.', 2000)
    })
  }
}
