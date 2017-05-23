import { Component, OnInit } from '@angular/core';

import { EventService } from './../services/event.service'
import { VendorService } from './../services/vendor.service'

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit {

  vendorPositions: Array<number>[]
  eventPositions: Array<number>[]
  currentPosition: Array<number>

  constructor(private EventStore: EventService, private VendorStore: VendorService) { }

  ngOnInit() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.getVendorPositions()
    this.getEventPositions()
    navigator.geolocation.getCurrentPosition(this.getCurrentPosition, this.handleError, options)
  }

  getVendorPositions() {

    this.vendorPositions = this.VendorStore.getVendorPositions()
  }

  getEventPositions() {
    this.eventPositions = this.EventStore.getEventPositions()
  }

  getCurrentPosition() {

  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
