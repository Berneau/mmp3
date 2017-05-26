import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';

import { User } from './../interfaces/user'
import { ApiEndpoint } from './../app.config'

@Injectable()
export class LoginService {
  public token: string
  public currentUserIsAdmin: boolean
  public currentUserIsLoggedIn: boolean
  public currentUser: User
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({ 'Content-Type': 'application/json' })
  private url = `${this.apiEndpoint}/auth`

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
    // // set token if saved in local storage
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    // this.token = this.currentUser && this.currentUser.token
  }

  login(form) {
    let user = {
      email: form.email,
      password: form.password
    }

    return this.http
      .post(this.url, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then((res: Response) => {
        let token = res.json() && res.json().token
        let isAdmin = res.json() && res.json().user.isAdmin
        let isLoggedIn = token ? true : false
        this.setCurrentUser(res.json().user, token, isLoggedIn, isAdmin )

        if (token) {
          this.token = token
          localStorage.setItem('currentUser', JSON.stringify({ email: form.email, _id: res.json().user._id, token: token }))
        }

        return res.json().user
      })
      .catch(this.handleError)
  }

  logout(): void {
    this.setCurrentUser(null, null, false, false)
    localStorage.removeItem('currentUser')
  }

  navigateTo(route) {
    if(route == "") {
      this.router.navigate(['/'])
    }
    else {
      this.router.navigate([`/${route}`])
    }
  }

  setCurrentUser(user, token, isLoggedIn, isAdmin) {
    this.currentUser = user
    this.token = token
    this.currentUserIsLoggedIn = isLoggedIn
    this.currentUserIsAdmin = isAdmin
  }

  isLoggedIn(): boolean {
    return this.currentUserIsLoggedIn
  }

  isAdmin(): boolean {
    return this.currentUserIsAdmin
  }

  handleError(err) {
    Materialize.toast(err.message, 2000)
  }
}
