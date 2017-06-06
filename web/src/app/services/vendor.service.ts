import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config'

import { Vendor } from './../interfaces/vendor'
import { Product } from './../interfaces/product'
import { Postit } from './../interfaces/postit'

@Injectable()
export class VendorService {

  vendors: Vendor[]
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  constructor(private http: Http) { }

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

  addVendor(form) {
    let url = `${this.apiEndpoint}/vendors`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })


    let v = {
      name: form.name,
      userUid: form.userUid,
      email: form.email,
      description: form.description,
      imageUrl: form.imageUrl ? form.imageUrl : 'vendor.png',
      farmImageUrl: form.farmImageUrl ? form.farmImageUrl : 'farm.png',
      subName: form.subName,
      website: form.website,
      tel: form.tel,
      address: {
        city: form.city,
        street: form.street,
        zip: form.zip,
        lat: form.lat,
        long: form.long
      }
    }

    return this.http
      .post(url, JSON.stringify(v), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getVendors()
        return res.json().vendor as Vendor
      })
      .catch(this.handleError)
  }

  deleteVendor(id): Promise<any> {
    let url = `${this.apiEndpoint}/vendors/${id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    return this.http
      .delete(url, { headers: authHeaders })
      .toPromise()
      .then((res) => {
        this.getVendors()
        return res.json()
      })
      .catch(this.handleError)
  }

  updateVendor(vendor, form) {
    let url = `${this.apiEndpoint}/vendors/${vendor._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let v = {
      name: form.name,
      userUid: vendor.userUid,
      email: vendor.email,
      description: form.description,
      imageUrl: form.imageUrl ? form.imageUrl : 'vendor.png',
      farmImageUrl: form.farmImageUrl ? form.farmImageUrl : 'farm.png',
      subName: form.subName,
      tel: form.tel,
      website: form.website,
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
        this.getVendors()
        return res.json().vendor as Vendor
      })
      .catch(this.handleError)
  }

  getVendorPositions() {
    let positions = []
    let vendors
    let url = `${this.apiEndpoint}/vendors`

    this.http
      .get(url)
      .toPromise()
      .then((res) => {
        vendors = res.json().vendors
      })
      .then(() => {
        for (let v of vendors) {
          if (v.address.lat && v.address.long) {
            positions.push(v)
          }
        }
      })
      .catch(this.handleError)

    return positions
  }

  getVendorByUserId(id) {
    let url = `${this.apiEndpoint}/vendors?userId=${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().vendor as Vendor
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
