import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Vendor } from './../interfaces/vendor'

@Component({
  selector: 'vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.less']
})
export class VendorFormComponent implements OnInit {

  vendorForm: FormGroup
  @Input() vendor: Vendor

  constructor(private fb: FormBuilder) {
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
}
