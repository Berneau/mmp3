import { Component, OnInit } from '@angular/core';

import { ProductService } from './../services/product.service'

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  constructor(private store: ProductService) { }

  ngOnInit() {
    this.store.getProducts()
  }

}
