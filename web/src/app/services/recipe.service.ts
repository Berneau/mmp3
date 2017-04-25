import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Recipe } from './../interfaces/recipe'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class RecipeService {

  constructor(private http: Http) { }

  recipes: Recipe[]
  recipe: Recipe
  private apiEndpoint = ApiEndpoint

  getRecipes() {
    this.recipes = [
      {
        _id: '1',
        name: 'Kartoffelknödel',
        description: 'alles zammanschgan',
        imageUrl: ''
      },
      {
        _id: '2',
        name: 'Kartoffelknödel',
        description: 'alles zammanschgan',
        imageUrl: ''
      },
      {
        _id: '3',
        name: 'Kartoffelknödel',
        description: 'alles zammanschgan',
        imageUrl: ''
      },
      {
        _id: '4',
        name: 'Kartoffelknödel',
        description: 'alles zammanschgan',
        imageUrl: ''
      }
    ]
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
