import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from './../interfaces/category'
import { CategoryService } from './../services/category.service'

import { Type } from './../interfaces/type'
import { TypeService } from './../services/type.service'
import { ProductService } from './../services/product.service'

@Component({
  selector: 'category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.less']
})
export class CategoryDetailComponent implements OnInit {

  constructor(private store: CategoryService, private TypeStore: TypeService, private route: ActivatedRoute, private location: Location, private ProductStore: ProductService) { }

  category: Category
  type: Type

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getCategory(id)
        .then(category => {
          if (!category) {
            this.location.back() // TODO: is location.back() sinnvoll ?
            Materialize.toast('Es wurde keine Produktkategorie mit dieser ID gefunden.', 2000)
            return
          }
          this.category = category
        })
        .then(type => {
          this.TypeStore.getType(this.category.typeUid)
            .then(type => {
              if (!type) {
                this.location.back() // TODO: is location.back() sinnvoll ?
                Materialize.toast('Es wurde keine Typ mit dieser ID gefunden.', 2000)
                return
              }
              this.type = type
            })
        })

      this.ProductStore.getCategoryProducts(id)
    })
  }
}
