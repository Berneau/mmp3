import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Vendor } from './../interfaces/vendor'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class VendorService {

  constructor(private http: Http) { }

  vendors: Vendor[]
  vendor: Vendor
  private apiEndpoint = ApiEndpoint

  getVendors(): Promise<any> {
    let url = `${this.apiEndpoint}/vendors`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.vendors = res.json()
        console.log(res.json())
      })
      .catch(this.handleError)
  }



  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
