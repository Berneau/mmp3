import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Vendor } from './../interfaces/vendor'

import { VendorService } from './../services/vendor.service'

@Component({
  selector: 'vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.less']
})
export class VendorFormComponent extends MzBaseModal {

  vendorForm: FormGroup
  @Input() vendor: Vendor

  constructor(private fb: FormBuilder, private store: VendorService) {
    super()
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.vendor) {
      this.vendorForm = this.fb.group({
        name: this.vendor.name,
        subName: this.vendor.subName,
        email: { value: this.vendor.email, disabled: true },
        imageUrl: this.vendor.imageUrl,
        description: this.vendor.description,
        tel: this.vendor.tel,
        website: this.vendor.website,
        city: this.vendor.address.city,
        street: this.vendor.address.street,
        zip: this.vendor.address.zip,
        lat: this.vendor.address.lat,
        long: this.vendor.address.long
      });
    }
    else {
      this.vendorForm = this.fb.group({
        name: '',
        subName: '',
        email: '',
        imageUrl: '',
        description: '',
        tel: '',
        website: '',
        city: '',
        street: '',
        zip: '',
        lat: '',
        long: ''
      });
    }
  }

  newVendor() {
    this.store.addVendor(this.vendor, this.vendorForm.value)
      .then(vendor => {
        if (!vendor) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Produkt gespeichert.', 2000)
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
