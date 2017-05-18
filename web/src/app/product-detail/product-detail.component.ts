import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from './../interfaces/product'
import { ProductService } from './../services/product.service'
import { CategoryService } from './../services/category.service'
import { VendorService } from './../services/vendor.service'

import { Vendor } from './../interfaces/vendor'
import { Category } from './../interfaces/category'

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {

  constructor(private store: ProductService, private CategoryStore: CategoryService, private VendorStore: VendorService, private route: ActivatedRoute, private location: Location) { }

  product: Product
  vendor: Vendor
  category: Category

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getProduct(id)
      .then(product => {
        if (!product) {
          this.location.back() // TODO: is location.back() sinnvoll ?
          Materialize.toast('Es wurde kein Produkt mit dieser ID gefunden.', 2000)
          return
        }
        this.product = product
      })
      .then(vendor => {
        this.VendorStore.getVendor(this.product.vendorId)
        .then(v => {
          if (!v) {
            Materialize.toast('Es wurde kein Produzent mit dieser ID gefunden.', 2000)
            return
          }
          this.vendor = v
        })
      })
      .then(category => {
        this.CategoryStore.getCategory(this.product.categoryId)
          .then(category => {
            if (!category) {
              Materialize.toast('Es wurde keine Typ mit dieser ID gefunden.', 2000)
              return
            }
            this.category = category
          })
      })
    })
  }

}
