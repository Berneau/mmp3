import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';

import { User } from './../interfaces/user'
import { ApiEndpoint } from './../app.config'

@Injectable()
export class LoginService {
  public token: string
  public currentUserIsAdmin: boolean
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({ 'Content-Type': 'application/json' })
  private url = `${this.apiEndpoint}/auth`
  currentUser: User

  constructor(private http: Http, private route: ActivatedRoute) {
    // set token if saved in local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.token = this.currentUser && this.currentUser.token
    this.currentUserIsAdmin = this.currentUser && this.currentUser.isAdmin
  }

  login(email, password) {
    return this.http
      .post(this.url, JSON.stringify({ email, password }), { headers: this.headers })
      .toPromise()
      .then((res: Response) => {
        console.log(res.json())
        let token = res.json() && res.json().token

        if (token) {
          this.token = token
          localStorage.setItem('currentUser', JSON.stringify({ email: email,  _id: res.json().user._id, isAdmin: res.json().user.isAdmin, token: token}))

          return true
        } else {
          return false
        }
      })
      .catch(this.handleError)
  }

  logout(): void {
    this.token = null
    this.currentUserIsAdmin = false
    localStorage.removeItem('currentUser')
  }

  isLoggedIn(): boolean {
    if (this.token) return true
    else return false
  }

  isAdmin(): boolean {
    // console.log("isAdmin")
    if (this.currentUserIsAdmin) return true
    else return false
  }

  handleError(err) {
    Materialize.toast(err.message, 2000)
  }
}
