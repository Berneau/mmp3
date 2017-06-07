import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config'

import { UploadService } from './../services/upload.service'

import { Category } from './../interfaces/category'
import { Product } from './../interfaces/product'
import { Type } from './../interfaces/type'

@Injectable()
export class CategoryService {

  categories: Category[]
  categoryProducts: Product[]
  AWSEndpoint: String
  private apiEndpoint = ApiEndpoint

  constructor(private http: Http, private uploadStore: UploadService) { }

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

  addCategory(form, file) {
    return this.uploadStore.fileUpload(file, 'category')
      .then((res: string) => {
        return this.addCategoryHelper(res, form)
          .then((category) => {
            return category as Category
          })
      })
      .catch(this.handleError)
  }

  addCategoryHelper(key, form) {
    let url = `${this.apiEndpoint}/categories`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let c = {
      name: form.value.name,
      typeUid: form.value.typeUid,
      imageUrl: key ? `https://lungau.s3.eu-central-1.amazonaws.com/${key}` : 'https://lungau.s3.eu-central-1.amazonaws.com/dummy_category.png',
      imageKey: key
    }

    return this.http
      .post(url, JSON.stringify(c), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getCategories()
        return res.json().category
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
      .catch((err) => {
        if (err.json().message == "Category is in use by at least one product - not deleted") {
          Materialize.toast('Die Kategorie enthält Produkte!', 2000)
        }
        else {
          this.handleError(err)
        }
      })
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
      imageUrl: form.imageUrl ? form.imageUrl : category.imageUrl ? category.imageUrl : '',
      imageKey: form.imageKey
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
    if (error.message) console.log(error.message, 2000)
    else if (error.statusText) console.log(error.statusText, 2000)
    else console.log(error)
  }
}
