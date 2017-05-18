import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Postit } from './../interfaces/postit'
import { ApiEndpoint } from './../app.config'

@Injectable()
export class PostitService {

  constructor(private http: Http) { }

  postits: Postit[]
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  getPostits(confirm): Promise<any> {
    let url = `${this.apiEndpoint}/postits`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.postits = res.json().postits.filter(p => {return p.confirmed === confirm})
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
        return res.json().postit as Postit
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
