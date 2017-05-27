import { Component, Input, OnInit } from '@angular/core';

import { Category } from './../interfaces/category'

import { ProductService } from './../services/product.service'

@Component({
  selector: 'product-vendor-list',
  templateUrl: './product-vendor-list.component.html',
  styleUrls: ['./product-vendor-list.component.less']
})
export class ProductVendorListComponent implements OnInit {

  @Input() category: Category

  constructor(private store: ProductService) { }

  ngOnInit() {
  this.store.getCategoryProducts(this.category._id)
  }

}
