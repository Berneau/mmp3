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
  currentPosition: Array<any>

  constructor(private EventStore: EventService, private VendorStore: VendorService) { }

  ngOnInit() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.currentPosition = [47.129550, 13.810360]
    navigator.geolocation.getCurrentPosition(this.getCurrentUserPosition, this.handleMapError, options)
    this.vendorPositions = this.VendorStore.getVendorPositions()
    this.eventPositions = this.EventStore.getEventPositions()
  }

  getVendorPositions() {
    this.vendorPositions = this.VendorStore.getVendorPositions()
  }

  getEventPositions() {
    this.eventPositions = this.EventStore.getEventPositions()
  }

  getCurrentUserPosition(pos) {
    if (this) {
      this.currentPosition = [pos.coords.latitude, pos.coords.longitude]
      console.log("currentPosition", this.currentPosition)
    }
  }

  handleMapError(err) {
    console.log("map error:", err.message)
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
