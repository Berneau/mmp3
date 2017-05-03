import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from './../interfaces/category'
import { CategoryService } from './../services/category.service'

@Component({
  selector: 'category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.sass']
})
export class CategoryDetailComponent implements OnInit {

  constructor(private store: CategoryService, private route: ActivatedRoute, private location: Location) { }

  category: Category

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getCategory(id)
      .then(category => {
        if (!category) {
          this.location.back() // TODO: is location.back() sinnovoll ?
          Materialize.toast('Es wurde keine Produktkategorie mit dieser ID gefunden.', 2000)
          return
        }
        this.category = category
      })

      this.store.getCategoryProducts(id)
    })
  }
}
