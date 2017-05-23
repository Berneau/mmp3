import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Category } from './../interfaces/category'
import { ApiEndpoint } from './../app.config'

import { Product } from './../interfaces/product'
import { Type } from './../interfaces/type'

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  categories: Category[]
  categoryProducts: Product[]
  private apiEndpoint = ApiEndpoint

  getCategories(): Promise<any> {
    let url = `${this.apiEndpoint}/categories`
    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.categories = res.json().categories
      })
      .catch(this.handleError)
  }

  getCategory(id): Promise<any> {
    let url = `${this.apiEndpoint}/categories/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().category as Category
      })
      .catch(this.handleError)
  }

  addCategory(form) {
    let url = `${this.apiEndpoint}/categories`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let c = {
      name: form.name,
      typeUid: form.typeUid,
      imageUrl: form.imageUrl ? form.imageUrl : 'category.png'
    }

    return this.http
      .post(url, JSON.stringify(c), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getCategories()
        return res.json().category as Category
      })
      .catch(this.handleError)
  }

  deleteCategory(id): Promise<any> {
    let url = `${this.apiEndpoint}/categories/${id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    return this.http
      .delete(url, { headers: authHeaders })
      .toPromise()
      .then((res) => {
        this.getCategories()
        return res.json()
      })
      .catch(this.handleError)
  }

  updateCategory(category, form) {
    let url = `${this.apiEndpoint}/categories/${category._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let c = {
      name: form.name,
      typeUid: form.typeUid,
      imageUrl: form.imageUrl ? form.imageUrl : 'category.png'
    }

    return this.http
      .put(url, JSON.stringify(c), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getCategories()
        return res.json().category as Category
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
