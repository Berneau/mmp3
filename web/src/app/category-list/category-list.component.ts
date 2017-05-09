import { Component, OnInit } from '@angular/core';

import { CategoryService } from './../services/category.service'

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {

  constructor(private store: CategoryService) { }

  ngOnInit() {
    this.store.getCategories()
  }

}
