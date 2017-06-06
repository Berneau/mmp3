import { Component, OnInit } from '@angular/core';

import { EventService } from './../services/event.service'
import { VendorService } from './../services/vendor.service'

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit {

  vendorPositions: Array<any>[]
  eventPositions: Array<any>[]
  currentPosition: Array<number>

  constructor(private EventStore: EventService, private VendorStore: VendorService) { }

  ngOnInit() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((pos) => {this.setCurrentPosition(pos.coords)}, (err) => {this.handleMapError(err)}, options)
    this.getVendorPositions()
    this.getEventPositions()
  }

  getVendorPositions() {
    this.vendorPositions = this.VendorStore.getVendorPositions()
  }

  getEventPositions() {
    this.eventPositions = this.EventStore.getEventPositions()
  }

  setCurrentPosition(coords) {
    this.currentPosition = [coords.latitude, coords.longitude]
  }

  handleMapError(err) {
    console.log('MAP ERROR', err)
    this.currentPosition = [47.129550, 13.810360]
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
