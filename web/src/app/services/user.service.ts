import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { ApiEndpoint } from './../app.config'

import { User } from './../interfaces/user'

@Injectable()
export class UserService {

  private apiEndpoint = ApiEndpoint
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  constructor(private http: Http) { }

  getUser(id): Promise<any> {
    let url = `${this.apiEndpoint}/users/${id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    return this.http
      .get(url, { headers: authHeaders })
      .toPromise()
      .then((res) => {
        return res.json().user as User
      })
      .catch(this.handleError)
  }

  addUser(form) {
    let url = `${this.apiEndpoint}/users`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let u = {
      email: form.email,
      password: form.password,
      isAdmin: form.isAdmin
    }

    return this.http
      .post(url, JSON.stringify(u), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        return res.json().user as User
      })
      .catch(this.handleError)
  }

  updateUser(user, form) {
    let url = `${this.apiEndpoint}/users/${user._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let u = {
      email: form.email,
      password: form.password,
      isAdmin: form.isAsmin
    }

    return this.http
      .put(url, JSON.stringify(u), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getUser(user._id)
        return res.json().user as User
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
