import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Vendor } from './../interfaces/vendor'
import { VendorService } from './../services/vendor.service'

@Component({
  selector: 'vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.sass']
})
export class VendorProfileComponent implements OnInit {

  constructor(private store: VendorService, private route: ActivatedRoute, private location: Location) { }

  vendor: Vendor

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getVendor(id)
      .then(vendor => {
        if (!vendor) {
          this.location.back()
          Materialize.toast('Es wurde kein Produzent mit dieser ID gefunden.', 2000)
          return
        }
        this.vendor = vendor
        console.log(this.vendor)
      })
    })
  }

}
