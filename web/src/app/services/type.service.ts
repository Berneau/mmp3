import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config'

import { Type } from './../interfaces/type'

@Injectable()
export class TypeService {

  types: Type[]
  private apiEndpoint = ApiEndpoint

  constructor(private http: Http) { }

  getTypes(): Promise<any> {
    let url = `${this.apiEndpoint}/types`
    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.types = res.json().types
      })
      .catch(this.handleError)
  }

  getType(id): Promise<any> {
    let url = `${this.apiEndpoint}/types/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().type as Type
      })
      .catch(this.handleError)
  }

  addType(form) {
    let url = `${this.apiEndpoint}/types`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let t = {
      name: form.name
    }

    return this.http
      .post(url, JSON.stringify(t), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getTypes()
        return res.json().type as Type
      })
      .catch(this.handleError)
  }

  deleteType(id): Promise<any> {
    let url = `${this.apiEndpoint}/types/${id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    return this.http
      .delete(url, { headers: authHeaders })
      .toPromise()
      .then((res) => {
        this.getTypes()
        return res.json()
      })
      .catch((err) => {
        if (err.json().message == "Type is in use by at least one category - not deleted") {
          Materialize.toast('Mindestens eine Kategorie hat diesen Typ!', 2000)
        }
        else {
          this.handleError(err)
        }
      })
  }

  updateType(type, form) {
    let url = `${this.apiEndpoint}/types/${type._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let t = {
      name: form.name
    }

    return this.http
      .put(url, JSON.stringify(t), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getTypes()
        return res.json().type as Type
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
