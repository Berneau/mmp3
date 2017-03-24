import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Product } from './../interfaces/product'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  products: Product[]
  private apiEndpoint = ApiEndpoint

  getProducts(): Promise<any> {
    let url = `${this.apiEndpoint}/products?skip=0?limit=15`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.products = res.json()
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
