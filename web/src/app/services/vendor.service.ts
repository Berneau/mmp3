import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Vendor } from './../interfaces/vendor'
import { ApiEndpoint } from './../app.config'

import { Product } from './../interfaces/product'

@Injectable()
export class VendorService {

  constructor(private http: Http) { }

  vendors: Vendor[]
  vendorProducts: Product[]
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  getVendors(): Promise<any> {
    let url = `${this.apiEndpoint}/vendors`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.vendors = res.json().vendors
      })
      .catch(this.handleError)
  }

  getVendor(id): Promise<any> {
    let url = `${this.apiEndpoint}/vendors/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().vendor as Vendor
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

  updateVendor(vendor, form) {
    let url = `${this.apiEndpoint}/vendors/${vendor._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders =  new Headers({
      'Content-Type': 'application/json',    'x-access-token': token
    })

    let v = {
      name: form.name,
      userUid: vendor.userUid,
      email: vendor.email,
      description: form.description,
      imageUrl: form.imageUrl,
      subName: form.subName,
      tel: form.tel,
      address: {
        city: form.city,
        zip: form.zip,
        street: form.street,
        lat: form.lat,
        long: form.long
      }
    }

    return this.http
      .put(url, JSON.stringify(v), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        return res.json().vendor as Vendor
      })
      .catch(this.handleError)
  }



  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
