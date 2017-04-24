import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Vendor } from './../interfaces/vendor'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class VendorService {

  constructor(private http: Http) { }

  vendors: Vendor[]
  private apiEndpoint = ApiEndpoint

  // getVendors(): Promise<any> {
  //   let url = `${this.apiEndpoint}/vendors?skip=0?limit=15`
  //
  //   return this.http
  //     .get(url)
  //     .toPromise()
  //     .then((res) => {
  //       this.vendors = res.json()
  //       console.log(res.json())
  //     })
  //     .catch(this.handleError)
  // }

  getVendors() {
    this.vendors = [
      {
        name: 'test',
        ownerName: 'bla',
        email: 'inco@gnito.com',
        category: 1,
        city: 'Lungau'
      },
      {
        name: 'test',
        ownerName: 'bla',
        email: 'inco@gnito.com',
        category: 1,
        city: 'Lungau'
      }
    ]
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
