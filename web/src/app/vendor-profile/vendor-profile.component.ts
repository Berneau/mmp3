import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VendorService } from './../services/vendor.service'
import { LoginService } from './../services/login.service'
import { ProductService } from './../services/product.service'
import { PostitService } from './../services/postit.service'

import { Vendor } from './../interfaces/vendor'
import { Product } from './../interfaces/product'

@Component({
  selector: 'vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.less']
})
export class VendorProfileComponent implements OnInit {

  vendor: Vendor

  constructor(private store: VendorService, private route: ActivatedRoute, private location: Location, public LoginStore: LoginService, private ProductStore: ProductService, private PostitStore: PostitService) {

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
        })

      this.ProductStore.getVendorProducts(id)
    })
  }

  updateVendor(v) {
    this.store.updateVendor(v.vendor, v.vendorForm.value)
      .then(vendor => {
        if (!vendor) {
          Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
          return
        }
        this.vendor = vendor
        Materialize.toast('Produzent gespeichert.', 2000)
      })
  }

  newProduct(p) {
    this.ProductStore.addProduct(p.vendor, p.productForm.value)
      .then(product => {
        if (!product) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Produkt gespeichert.', 2000)
      })
  }

  newPostit(p) {
    this.PostitStore.addPostit(p.vendor, p.postitForm.value)
      .then(postit => {
        if (!postit) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Eintrag gespeichert.', 2000)
      })
  }

}
