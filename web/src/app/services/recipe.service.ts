import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Recipe } from './../interfaces/recipe'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class RecipeService {

  constructor(private http: Http) { }

  recipes: Recipe[]
  private apiEndpoint = ApiEndpoint

  getRecipes(): Promise<any> {
    let url = `${this.apiEndpoint}/recipes`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.recipes = res.json().recipes
      })
      .catch(this.handleError)
  }

  getRecipe(id): Promise<any> {
    let url = `${this.apiEndpoint}/recipes/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().recipe as Recipe
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
