import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config';

import { UploadService } from './../services/upload.service'
import { LoginService } from './../services/login.service'

import { Product } from './../interfaces/product'
import { Vendor } from './../interfaces/vendor'

@Injectable()
export class ProductService {

  private apiEndpoint = ApiEndpoint

  constructor(private http: Http, private uploadStore: UploadService, private LoginStore: LoginService) { }

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
  addProduct(vendor, form, file) {
    if (this.LoginStore.isAdmin() && file) {
      return this.uploadStore.fileUpload(file, 'product')
        .then((res: string) => {
          return this.addProductHelper(res, form, vendor)
            .then((product) => {
              return product as Product
            })
        })
        .catch(this.handleError)
    }
    else {
      return this.addProductHelper(null, form, vendor)
        .then((product) => {
          return product as Product
        })
    }
  }

  addProductHelper(key, form, vendor) {
    let url = `${this.apiEndpoint}/products`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let p = {
      name: form.name,
      categoryId: form.categoryId,
      vendor: vendor,
      availableAt: {
        fromPeriod: form.fromPeriod,
        fromMonth: form.fromMonth,
        toPeriod: form.toPeriod,
        toMonth: form.toMonth
      },
      imageUrl: key ? `https://lungau.s3.eu-central-1.amazonaws.com/${key}` : 'https://lungau.s3.eu-central-1.amazonaws.com/dummies/dummy_product.jpg',
      imageKey: key
    }

    return this.http
      .post(url, JSON.stringify(p), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        return res.json().product as Product
      })
      .catch(this.handleError)
  }

  deleteProduct(id, vendor): Promise<any> {
    let url = `${this.apiEndpoint}/products/${id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })
    return this.http
      .delete(url, { headers: authHeaders })
      .toPromise()
      .then((res) => {
        this.getVendorProducts(vendor._id)
        return res.json()
      })
      .catch(this.handleError)
  }

  updateProduct(vendor, product, form, file) {
    if (this.LoginStore.isAdmin() && file) {
      return this.uploadStore.fileUpload(file, 'product')
        .then((res: string) => {
          return this.updateProductHelper(vendor, product, form, res)
            .then((product) => {
              return product as Product
            })
        })
        .catch(this.handleError)
    }
    else {
      return this.updateProductHelper(vendor, product, form, null)
        .then((product) => {
          return product as Product
        })
    }
  }

  updateProductHelper(vendor, product, form, key) {
    let url = `${this.apiEndpoint}/products/${product._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let p = {
      name: form.name,
      categoryId: form.categoryId,
      vendor: vendor,
      availableAt: {
        fromPeriod: form.fromPeriod,
        fromMonth: form.fromMonth,
        toPeriod: form.toPeriod,
        toMonth: form.toMonth
      },
      imageUrl: key ? `https://lungau.s3.eu-central-1.amazonaws.com/${key}` : form.imageUrl ? form.imageUrl : 'https://lungau.s3.eu-central-1.amazonaws.com/dummies/dummy_product.jpg',
      imageKey: key ? key : form.imageKey ? form.imageKey : ''
    }

    return this.http
      .put(url, JSON.stringify(p), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getVendorProducts(product.vendor._id)
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
        if (res.json().products.length != 0) {
          return res.json().products
        }
      })
      .catch(this.handleError)
  }

  getCategoryProducts(id): Promise<any> {
    let url = `${this.apiEndpoint}/products?categoryId=${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        if (res.json().products.length != 0) {
          return res.json().products
        }
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
