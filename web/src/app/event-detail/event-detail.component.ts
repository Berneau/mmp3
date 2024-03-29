import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from './../interfaces/event'
import { Vendor } from './../interfaces/vendor'

import { EventService } from './../services/event.service'
import { VendorService } from './../services/vendor.service'

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.less']
})
export class EventDetailComponent implements OnInit {

  event: Event
  position: Array<number>

  constructor(private store: EventService, private route: ActivatedRoute, private location: Location, private VendorStore: VendorService) { }

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getEvent(id)
        .then(event => {
          if (!event) {
            this.location.back() // TODO: is location.back() sinnvoll ?
            Materialize.toast('Es wurde kein Event mit dieser ID gefunden.', 2000)
            return
          }
          this.event = event
          this.position = [this.event.location.lat, this.event.location.long]
        })
    })
  }
}
