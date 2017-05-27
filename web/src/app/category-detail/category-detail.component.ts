import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from './../interfaces/category'
import { Type } from './../interfaces/type'

import { CategoryService } from './../services/category.service'
import { TypeService } from './../services/type.service'


@Component({
  selector: 'category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.less']
})
export class CategoryDetailComponent implements OnInit {

  category: Category
  type: Type

  constructor(private store: CategoryService, private route: ActivatedRoute, private location: Location, private TypeStore: TypeService) { }

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
    })
  }
}
