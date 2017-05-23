import { Component, Input, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { Vendor } from './../interfaces/vendor'

import { VendorService } from './../services/vendor.service'

import { VendorFormComponent } from './../vendor-form/vendor-form.component'

@Component({
  selector: 'admin-vendor-list',
  templateUrl: './admin-vendor-list.component.html',
  styleUrls: ['./admin-vendor-list.component.less']
})
export class AdminVendorListComponent implements OnInit {

  selectedVendor: Vendor

  constructor(private store: VendorService, private modalService: MzModalService) { }

  ngOnInit() {
    this.store.getVendors()
  }

  selectVendor(vendor: Vendor) {
    this.selectedVendor = vendor
    this.modalService.open(VendorFormComponent, {vendor: this.selectedVendor});
  }

  deleteVendor(v) {
    this.store.deleteVendor(v._id)
      .then(success => {
        if (!success) {
          Materialize.toast('Fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Eintrag gelöscht.', 2000)
      })
  }

}
