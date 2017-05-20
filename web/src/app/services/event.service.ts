import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Event } from './../interfaces/event'
import { ApiEndpoint } from './../app.config'

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  events: Event[]
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  getEvents(): Promise<any> {
    let url = `${this.apiEndpoint}/events`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        this.events = res.json().events
      })
      .catch(this.handleError)
  }

  getEvent(id): Promise<any> {
    let url = `${this.apiEndpoint}/events/${id}`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        return res.json().event as Event
      })
      .catch(this.handleError)
  }

  addEvent(date, form) {
    let url = `${this.apiEndpoint}/events`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let e = {
      name: form.name,
      date: date,
      description: form.description,
      location: {
        name: form.location.name,
        lat: form.location.lat,
        long: form.location.long
      }
    }

    return this.http
      .post(url, JSON.stringify(e), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        return res.json().event as Event
      })
      .catch(this.handleError)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }

}
