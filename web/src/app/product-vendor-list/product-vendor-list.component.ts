import { Component, Input, OnInit } from '@angular/core';

import { Category } from './../interfaces/category'
import { Product } from './../interfaces/product'

import { ProductService } from './../services/product.service'

@Component({
  selector: 'product-vendor-list',
  templateUrl: './product-vendor-list.component.html',
  styleUrls: ['./product-vendor-list.component.less']
})
export class ProductVendorListComponent implements OnInit {

  categoryProducts: Product[]
  @Input() category: Category

  constructor(private store: ProductService) { }

  ngOnInit() {
  this.getCategoryProducts(this.category._id)
  }

  getCategoryProducts(id) {
    this.store.getCategoryProducts(id)
      .then((products) => {
        this.categoryProducts = products
      })
  }

}
