import { Component, Input, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { Category } from './../interfaces/category'

import { CategoryService } from './../services/category.service'

import { CategoryFormComponent } from './../category-form/category-form.component'

@Component({
  selector: 'admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.less']
})
export class AdminCategoryListComponent implements OnInit {

  selectedCategory: Category

  constructor(private store: CategoryService, private modalService: MzModalService) { }

  ngOnInit() {
    this.store.getCategories()
  }

  selectCategory(category: Category) {
    this.selectedCategory = category
    this.modalService.open(CategoryFormComponent, {category: this.selectedCategory});
  }

  deleteCategory(c) {
    this.store.deleteCategory(c._id)
      .then(success => {
        if (!success) {
          Materialize.toast('Fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Eintrag gelöscht.', 2000)
      })
  }

}
