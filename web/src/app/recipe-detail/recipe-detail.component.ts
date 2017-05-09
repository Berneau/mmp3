import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RecipeService } from './../services/recipe.service'

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private store: RecipeService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getRecipe(id)
      .then(recipe => {
        if (!recipe) {
          this.location.back() // TODO: is location.back() sinnvoll ?
          Materialize.toast('Es wurde kein Rezept mit dieser ID gefunden.', 2000)
          return
        }
      })
    })
  }

}
