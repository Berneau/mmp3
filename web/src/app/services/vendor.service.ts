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
    'Content-Type': 'application/json',
    'x-access-token': token
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

  updateVendor(v) {
    console.log(v)
    let url = `${this.apiEndpoint}/vendors/${v.vendor._id}`
    let vendor = {
      name: v.editForm.value.name,
      userUid: v.vendor.userUid,
      email: v.vendor.email,
      description: v.editForm.value.description,
      imageUrl: v.editForm.value.imageUrl,
      subName: v.editForm.value.subName,
      tel: v.editForm.value.tel,
      address: {
        city: v.editForm.value.city,
        zip: v.editForm.value.zip,
        street: v.editForm.value.street,
        lat: v.editForm.value.lat,
        long: v.editForm.value.long
      }
    }

    return this.http
      .put(url, JSON.stringify(vendor), { headers: this.headers })
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
