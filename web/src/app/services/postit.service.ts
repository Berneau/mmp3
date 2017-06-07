import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config'

import { UploadService } from './../services/upload.service'

import { Postit } from './../interfaces/postit'

@Injectable()
export class PostitService {

  postits: Postit[]
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http, private uploadStore: UploadService) { }

  getPostits(): Promise<any> {
    let url = `${this.apiEndpoint}/postits`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.postits = res.json().postits
      })
      .catch(this.handleError)
  }

  getPostit(id): Promise<any> {
    let url = `${this.apiEndpoint}/postits/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().postit as Postit
      })
      .catch(this.handleError)
  }

  confirmPostit(p) {
    let url = `${this.apiEndpoint}/postits/${p._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    p.confirmed = true

    return this.http
      .put(url, JSON.stringify(p), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getPostits()
        return res.json().postit as Postit
      })
      .catch(this.handleError)
  }

  addPostit(vendor, form, file) {
    return this.uploadStore.fileUpload(file, 'postit')
      .then((res: string) => {
        return this.addPostitHelper(res, form, vendor)
          .then((postit) => {
            return postit as Postit
          })
      })
      .catch(this.handleError)
  }

  addPostitHelper(key, form, vendor) {
    let url = `${this.apiEndpoint}/postits`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let p = {
      name: form.name,
      confirmed: form.confirmed,
      vendorId: vendor ? vendor._id : null,
      description: form.description,
      location: form.location,
      imageUrl: key ? `https://lungau.s3.eu-central-1.amazonaws.com/${key}` : 'https://lungau.s3.eu-central-1.amazonaws.com/dummy_postit.png',
      imageKey: key
    }

    return this.http
      .post(url, JSON.stringify(p), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getPostits()
        return res.json().postit as Postit
      })
      .catch(this.handleError)
  }

  deletePostit(id): Promise<any> {
    let url = `${this.apiEndpoint}/postits/${id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    return this.http
      .delete(url, { headers: authHeaders })
      .toPromise()
      .then((res) => {
        this.getPostits()
        return res.json()
      })
      .catch(this.handleError)
  }

  updatePostit(vendor, postit, form, file) {
    return this.uploadStore.fileUpload(file, 'postit')
      .then((res: string) => {
        return this.updatePostitHelper(vendor, postit, form, res)
          .then((postit) => {
            return postit as Postit
          })
      })
      .catch(this.handleError)
  }

  updatePostitHelper(vendor, postit, form, key) {
    let url = `${this.apiEndpoint}/postits/${postit._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let p = {
      name: form.name,
      confirmed: form.confirmed,
      vendorId: vendor ? vendor._id : null,
      description: form.description,
      location: form.location,
      imageUrl: key ? `https://lungau.s3.eu-central-1.amazonaws.com/${key}` : form.imageUrl ? form.imageUrl : 'https://lungau.s3.eu-central-1.amazonaws.com/dummy_postit.png',
      imageKey: key ? key : form.imageKey ? form.imageKey : ''
    }

    return this.http
      .put(url, JSON.stringify(p), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getPostits()
        return res.json().postit as Postit
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
