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
  private headers = new Headers({ 'Content-Type': 'application/json' })

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

  updateVendor(v) {
    let url = `${this.apiEndpoint}/vendors/${v.vendor._id}`
    let name = v.editForm.value.name
    let userUID = v.vendor.userUID
    let email = v.vendor.email
    let description = v.editForm.value.description
    let imageUrl = v.editForm.value.imageUrl
    let subName = v.editForm.value.subName
    let tel = v.editForm.value.tel
    let city = v.editForm.value.city
    let zip = v.editForm.value.zip
    let street = v.editForm.value.street
    let lat = v.editForm.value.lat
    let long = v.editForm.value.long
    let address = {
      city: city,
      zip: zip,
      street: street,
      lat: lat,
      long: long
    }

    return this.http
      .put(url, JSON.stringify({ name, userUID, email, description, imageUrl, subName, tel, address }), { headers: this.headers })
      .toPromise()
      .then((res: Response) => {
        console.log(res.json())
      })
      .catch(this.handleError)
  }



  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
