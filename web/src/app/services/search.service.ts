import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config'

import { Vendor } from './../interfaces/vendor'
import { Category } from './../interfaces/category'
import { Event } from './../interfaces/event'

@Injectable()
export class SearchService {

  private apiEndpoint = ApiEndpoint
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  constructor(private router: Router, private http: Http) { }

  search(word) {
    this.router.navigate(['suche', { search: word }])
  }

  getVendorResults(word): Promise<any> {
    let url = `${this.apiEndpoint}/vendors?filter=${word}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().vendors
      })
      .catch(this.handleError)
  }

  getProductResults(word): Promise<any> {
    let url = `${this.apiEndpoint}/products?filter=${word}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().products
      })
      .catch(this.handleError)
  }

  getEventResults(word): Promise<any> {
    let url = `${this.apiEndpoint}/events?filter=${word}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().events
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
