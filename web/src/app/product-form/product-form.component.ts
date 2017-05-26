import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Product } from './../interfaces/product'
import { Vendor } from './../interfaces/vendor'
import { Category } from './../interfaces/category'

import { CategoryService } from './../services/category.service'
import { ProductService } from './../services/product.service'

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less']
})
export class ProductFormComponent extends MzBaseModal {

  productForm: FormGroup
  @Input() product: Product
  @Input() vendor: Vendor
  periods: String[]
  months: String[]

  constructor(private fb: FormBuilder, private CategoryStore: CategoryService, private store: ProductService) {
    super()
  }

  ngOnInit() {
    this.periods = ['Anfang', 'Mitte', 'Ende']
    this.months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    this.createForm()
    this.CategoryStore.getCategories()
  }

  createForm() {
    if (this.product) {
      this.productForm = this.fb.group({
        name: [this.product.name, Validators.required],
        categoryId: [this.product.categoryId, Validators.required],
        vendor: [{value: this.vendor != undefined ? this.vendor : null, disabled: true }, Validators.required],
        fromPeriod: [this.product.availableAt.fromPeriod, Validators.required],
        fromMonth: [this.product.availableAt.fromMonth, Validators.required],
        toPeriod: [this.product.availableAt.toPeriod, Validators.required],
        toMonth: [this.product.availableAt.toMonth, Validators.required],
        imageUrl: this.product.imageUrl
      });
    }
    else {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        categoryId: ['', Validators.required],
        vendor: [{value: this.vendor != undefined ? this.vendor : null, disabled: true }, Validators.required],
        fromPeriod: ['', Validators.required],
        fromMonth: ['', Validators.required],
        toPeriod: ['', Validators.required],
        toMonth: ['', Validators.required],
        imageUrl: ''
      });
    }
  }

  submit() {
    if (this.productForm.valid) {
      if (this.product) {
        this.updateProduct(this.product)
      }
      else {
        this.newProduct()
      }
      this.modalComponent.close()
    }
    else {
      Materialize.toast('Kontrollieren Sie bitte alle Felder.', 2000)
    }
  }

  newProduct() {
    this.store.addProduct(this.vendor, this.productForm.value)
      .then(product => {
        if (!product) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Produkt gespeichert.', 2000)
      })
  }

  updateProduct(p) {
    this.store.updateProduct(this.vendor, p, this.productForm.value)
      .then(product => {
        if (!product) {
          Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Änderungen gespeichert.', 2000)
      })
  }

}
