import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from './../interfaces/product'
import { ProductService } from './../services/product.service'

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit {

  constructor(private store: ProductService, private route: ActivatedRoute, private location: Location) { }

  product: Product

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getProduct(id)
      .then(product => {
        if (!product) {
          this.location.back() // TODO: is location.back() sinnovoll ?
          Materialize.toast('Es wurde kein Produkt mit dieser ID gefunden.', 2000)
          return
        }
        this.product = product
        console.log(this.product)
      })
    })
  }

}
