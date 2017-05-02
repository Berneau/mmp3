import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Category } from './../interfaces/category'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  categories: Category[]
  private apiEndpoint = ApiEndpoint

  getCategories(): Promise<any> {
    let url = `${this.apiEndpoint}/categories`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.categories = res.json()
      })
      .catch(this.handleError)
  }

  getCategory(id): Promise<any> {
    let url = `${this.apiEndpoint}/categories/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json() as Category
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
