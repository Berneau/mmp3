import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MzModalService } from 'ng2-materialize';

import { Vendor } from './../interfaces/vendor'

import { VendorService } from './../services/vendor.service'
import { LoginService } from './../services/login.service'

import { PostitFormComponent } from './../postit-form/postit-form.component'
import { ProductFormComponent } from './../product-form/product-form.component'
import { VendorFormComponent } from './../vendor-form/vendor-form.component'

@Component({
  selector: 'vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.less']
})
export class VendorProfileComponent implements OnInit {

  vendor: Vendor
  position: Array<number>

  constructor(private store: VendorService, private route: ActivatedRoute, private location: Location, private LoginStore: LoginService, private modalService: MzModalService) {

  }

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getVendor(id)
        .then(vendor => {
          if (!vendor) {
            this.location.back() // TODO: is location.back() sinnvoll ?
            Materialize.toast('Es wurde kein Produzent mit dieser ID gefunden.', 2000)
            return
          }
          this.vendor = vendor
          this.position = [this.vendor.address.lat, this.vendor.address.long]
        })
    })
  }

  openNewPostitModal() {
    this.modalService.open(PostitFormComponent, {vendor: this.vendor});
  }

  openNewProductModal() {
    this.modalService.open(ProductFormComponent, {vendor: this.vendor});
  }
}
