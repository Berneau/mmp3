import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Vendor } from './../interfaces/vendor'

@Component({
  selector: 'vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.sass']
})
export class VendorFormComponent implements OnInit {

  editForm: FormGroup
  @Input() vendor: Vendor

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm()
  }

  // createForm() {
  //   this.editForm = this.fb.group({
  //     name: this.vendor.name,
  //     subName: this.vendor.subName,
  //     email: {value: this.vendor.email, disabled: true},
  //     imageUrl: this.vendor.imageUrl,
  //     description: this.vendor.description,
  //     tel: this.vendor.tel,
  //     city: this.vendor.address.city,
  //     street: this.vendor.address.street,
  //     zip: this.vendor.address.zip,
  //     lat: this.vendor.address.lat,
  //     long: this.vendor.address.long
  //   });
  // }

  createForm() {
    this.editForm = this.fb.group({
      name: '',
      subName: '',
      email: {value: '', disabled: true},
      imageUrl: '',
      description: '',
      tel: '',
      city: '',
      street: '',
      zip: '',
      lat: '',
      long: ''
    });
  }
}
