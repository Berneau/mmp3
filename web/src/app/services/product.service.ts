import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Product } from './../interfaces/product'
import { Vendor } from './../interfaces/vendor'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class ProductService {

  vendorProducts: Product[]
  categoryProducts: Product[]

  constructor(private http: Http) { }

  private apiEndpoint = ApiEndpoint

  getProduct(id): Promise<any> {
    let url = `${this.apiEndpoint}/products/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().product as Product
      })
      .catch(this.handleError)
  }

  addProduct(vendor, form) {
    let url = `${this.apiEndpoint}/products`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })
    let p = {
      name: form.name,
      categoryId: form.categoryId,
      vendorId: vendor ? vendor._id : null,
      availableAt: {
        fromPeriod: form.fromPeriod,
        fromMonth: form.fromMonth,
        toPeriod: form.toPeriod,
        toMonth: form.toMonth
      },
      imageUrl: form.imageUrl
    }

    return this.http
      .post(url, JSON.stringify(p), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.vendorProducts.push(res.json().product)
        return res.json().product as Product
      })
      .catch(this.handleError)
  }

  getVendorProducts(id): Promise<any> {
    let url = `${this.apiEndpoint}/products?vendorId=${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.vendorProducts = res.json().products
      })
      .catch(this.handleError)
  }

  getCategoryProducts(id): Promise<any> {
    let url = `${this.apiEndpoint}/products?categoryId=${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.categoryProducts = res.json().products
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
