import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApiEndpoint } from './../app.config'

import { Event } from './../interfaces/event'

@Injectable()
export class EventService {

  events: Event[]
  private apiEndpoint = ApiEndpoint
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  constructor(private http: Http) { }

  getEvents(): Promise<any> {
    let url = `${this.apiEndpoint}/events`

    return this.http
      .get(url)
      .toPromise()
      .then((res) => {
        if (res.json().events.length != 0) {
          this.events = res.json().events
        }
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

  addEvent(form) {
    let url = `${this.apiEndpoint}/events`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let e = {
      name: form.name,
      date: new Date(form.date),
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
        this.getEvents()
        return res.json().event as Event
      })
      .catch(this.handleError)
  }

  deleteEvent(id): Promise<any> {
    let url = `${this.apiEndpoint}/events/${id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    return this.http
      .delete(url, { headers: authHeaders })
      .toPromise()
      .then((res) => {
        this.getEvents()
        return res.json()
      })
      .catch(this.handleError)
  }

  updateEvent(event, form) {
    let url = `${this.apiEndpoint}/events/${event._id}`
    let token = JSON.parse(localStorage.getItem('currentUser')).token
    let authHeaders = new Headers({
      'Content-Type': 'application/json', 'x-access-token': token
    })

    let e = {
      name: form.name,
      date: new Date(form.date),
      description: form.description,
      location: {
        name: form.location.name,
        lat: form.location.lat,
        long: form.location.long
      }
    }

    return this.http
      .put(url, JSON.stringify(e), { headers: authHeaders })
      .toPromise()
      .then((res: Response) => {
        this.getEvents()
        return res.json().event as Event
      })
      .catch(this.handleError)
  }

  getEventPositions() {
    let positions = []
    let events
    let url = `${this.apiEndpoint}/events`

    this.http
      .get(url)
      .toPromise()
      .then((res) => {
        events = res.json().events
      })
      .then(() => {
        for (let e of events) {
          if (e.location.lat && e.location.long) {
            let arr = [e.location.lat, e.location.long]
            positions.push(arr)
          }
        }
      })
      .catch(this.handleError)

      return positions
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }

}
