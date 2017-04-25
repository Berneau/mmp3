import { Component, OnInit } from '@angular/core';

import { RecipeService } from './../services/recipe.service'

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {

  constructor(private store: RecipeService) { }

  ngOnInit() {
    this.store.getRecipes()
  }

}
