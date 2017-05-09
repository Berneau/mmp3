import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from './../interfaces/product'
import { Vendor } from './../interfaces/vendor'

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup
  @Input() product: Product
  @Input() vendor: Vendor

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.product) {
      this.productForm = this.fb.group({
        name: this.product.name,
        categoryId: this.product.categoryId,
        vendorId: { value: this.vendor._id, disabled: true },
        fromPeriod: this.product.availableAt.fromPeriod,
        fromMonth: this.product.availableAt.fromMonth,
        toPeriod: this.product.availableAt.toPeriod,
        toMonth: this.product.availableAt.toMonth,
        imageUrl: this.product.imageUrl
      });
    }
    else {
      this.productForm = this.fb.group({
        name: '',
        categoryId: '',
        vendorId: { value: this.vendor._id, disabled: true },
        fromPeriod: '',
        fromMonth: '',
        toPeriod: '',
        toMonth: '',
        imageUrl: ''
      });
    }
  }

}