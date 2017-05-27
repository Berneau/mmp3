import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config'

import { User } from './../interfaces/user'

import { UserService } from './../services/user.service'

@Injectable()
export class LoginService {

  public token: string
  public currentUserIsAdmin: boolean
  public currentUserIsLoggedIn: boolean
  public currentUser: User
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({ 'Content-Type': 'application/json' })
  private url = `${this.apiEndpoint}/auth`

  constructor(private http: Http, private route: ActivatedRoute, private router: Router, private UserStore: UserService) {
    this.currentUser = null
    this.token = null
    this.currentUserIsAdmin = false
    this.currentUserIsLoggedIn = false
    // // set token if saved in local storage
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.setCurrentUserFromToken(JSON.parse(localStorage.getItem('currentUser')))
    }
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
        this.setCurrentUser(res.json().user, token, isLoggedIn, isAdmin)

        if (token) {
          this.token = token
          localStorage.setItem('currentUser', JSON.stringify({ token: token, _id: res.json().user._id }))
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
    if (route == "") {
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

  setCurrentUserFromToken(storage) {
    this.UserStore.getUser(storage._id)
      .then(user => {
        if (user) {
          this.currentUser = user
          this.token = storage.token
          this.currentUserIsLoggedIn = storage.token ? true : false
          this.currentUserIsAdmin = user.isAdmin ? true : false
        }
      })
  }

  isLoggedIn(): boolean {
    return this.currentUserIsLoggedIn
  }

  isAdmin(): boolean {
    return this.currentUserIsAdmin
  }

  isCurrentVendor(id): boolean {
    if (this.currentUserIsAdmin && this.currentUser) {
      return this.currentUserIsAdmin
    }
    else {
      if (this.currentUser) {
        return id == this.currentUser._id
      }
    }
    return false
  }

  handleError(err) {
    Materialize.toast(err.message, 2000)
  }
}
