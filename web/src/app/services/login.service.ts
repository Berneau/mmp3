import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';

import { User } from './../interfaces/user'
import { ApiEndpoint } from './../app.config'

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
    if(JSON.parse(localStorage.getItem('currentUser'))) {
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
        this.setCurrentUser(res.json().user, token, isLoggedIn, isAdmin )

        if (token) {
          this.token = token
          localStorage.setItem('currentUser', JSON.stringify({token: token, _id: res.json().user._id }))
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

  setCurrentUserFromToken(storage) {
    this.UserStore.getUser(storage._id)
    .then (user => {
      // to set isAdmin before admin-guard asks if current user is admin
      this.currentUserIsAdmin = user.isAdmin

      let token = storage.token
      let isLoggedIn = token ? true : false
      this.setCurrentUser(user, token, isLoggedIn, user.isAdmin)
    })
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
