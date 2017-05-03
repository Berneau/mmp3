import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Product } from './../interfaces/product'
import { Vendor } from './../interfaces/vendor'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  private apiEndpoint = ApiEndpoint

  getProduct(id): Promise<any> {
    let url = `${this.apiEndpoint}/products/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json() as Product
      })
      .catch(this.handleError)
  }

  getVendor(id): Promise<any> {
    let url = `${this.apiEndpoint}/vendors/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json() as Vendor
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
