import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Type } from './../interfaces/type'
import { ApiEndpoint } from './../app.config'

@Injectable()
export class TypeService {

  private apiEndpoint = ApiEndpoint

  constructor(private http: Http) { }

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

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
