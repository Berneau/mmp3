import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './../interfaces/user'
import { ApiEndpoint } from './../app.config'

@Injectable()
export class LoginService {
  public token: string
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({ 'Content-Type': 'application/json' })
  private url = `${this.apiEndpoint}/user/login`
  currentUser: User


  constructor(private http: Http) {
    // set token if saved in local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.token = this.currentUser && this.currentUser.token
  }

  login(email, password) {
    return this.http
      .post(this.apiEndpoint, JSON.stringify({ email, password }), { headers: this.headers })
      .toPromise()
      .then((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token
        let isAdmin = response.json() && response.json().user.admin

        if (token && isAdmin) {
          // set token property
          this.token = token

          //store username and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }))

          console.log(response.json())

          // return true to indicate successful login
          return true
        } else {
          // return false to indicate failed login
          return false
        }
      })
      .catch(this.handleError)
  }

  logout(): void {
    this.token = null
    localStorage.removeItem('currentUser')
  }

  isLoggedIn(): boolean {
    if (this.token) return true
    else return false
  }

  handleError(err) {
    Materialize.toast(err.message, 2000)
  }
}
