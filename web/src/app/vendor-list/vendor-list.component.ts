import { Component, OnInit } from '@angular/core';

import { VendorService } from './../services/vendor.service'

@Component({
  selector: 'vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.sass']
})
export class VendorListComponent implements OnInit {

  constructor(private store: VendorService) { }

  ngOnInit() {
    this.store.getVendors()
  }

}
