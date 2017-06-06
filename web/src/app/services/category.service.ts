import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config'

import { Category } from './../interfaces/category'
import { Product } from './../interfaces/product'
import { Type } from './../interfaces/type'

@Injectable()
export class CategoryService {

  categories: Category[]
  categoryProducts: Product[]
  private apiEndpoint = ApiEndpoint

  constructor(private http: Http) { }

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
    let url = `${this.apiEndpoint}/upload`//`${this.apiEndpoint}/categories`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    return new Promise((resolve, reject) => {
      var formData: any = new FormData()
      var xhr = new XMLHttpRequest()

      // formData.append('beer_id', beer_id)
      formData.append('file', file)

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) resolve(JSON.parse(xhr.response))
          else reject(xhr.response)
        }
      }
      xhr.open("POST", url, true)
      xhr.setRequestHeader('x-amz-meta-fieldName', 'category-file');
      xhr.setRequestHeader('x-access-token', token);
      xhr.send(formData)
    })
      .then((res) => {

        // TODO: res.link geht nicht -> herausfinden warum
        console.log(res)

        let c = {
          name: form.name,
          typeUid: form.typeUid,
          imageUrl: ''
        }


        // this.http
        // TODO: url ist selbe wie oben -> ladet bild nochmal hoch
        //   .post(url, JSON.stringify(c), { headers: authHeaders })
        //   .toPromise()
        //   .then((res) => {
        //     this.getCategories()
        //     // console.log(res)
        //     return res.category as Category
        //   })
        //   .catch(this.handleError)
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
    console.log(error)
  }
}
