import { Component, OnInit } from '@angular/core';

import { ProductService } from './../services/product.service'

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})

export class ProductListComponent implements OnInit {

  constructor(private store: ProductService) { }

  ngOnInit() {
    this.store.getProducts()
  }
}
