import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PostitService } from './../services/postit.service'
import { LoginService } from './../services/login.service'
import { VendorService } from './../services/vendor.service'

import { Postit } from './../interfaces/postit'
import { Vendor } from './../interfaces/vendor'

@Component({
  selector: 'postit-detail',
  templateUrl: './postit-detail.component.html',
  styleUrls: ['./postit-detail.component.less']
})
export class PostitDetailComponent implements OnInit {

  postit: Postit
  vendor: Vendor

  constructor(private store: PostitService, private LoginStore: LoginService, private VendorStore: VendorService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getPostit(id)
        .then(postit => {
          if (!postit) {
            this.location.back() // TODO: is location.back() sinnvoll ?
            Materialize.toast('Es wurde kein Schlachtbrett-Eintrag mit dieser ID gefunden.', 2000)
            return
          }
          this.postit = postit
        })
        .then(vendor => {
          if (this.postit.vendorId) {
            this.VendorStore.getVendor(this.postit.vendorId)
              .then(v => {
                if (!v) {
                  Materialize.toast('Es wurde kein Produzent mit dieser ID gefunden.', 2000)
                  return
                }
                this.vendor = v
              })
          }
          else {
            this.vendor = undefined
          }
        })
    })
  }

  confirmPostit(p) {
    this.store.confirmPostit(p)
      .then(postit => {
        if (!postit) {
          Materialize.toast('Bestätigung fehlgeschlagen.', 2000)
          return
        }
        this.postit = postit
        this.location.back() // TODO: is location.back() sinnvoll ?
        Materialize.toast('Eintrag gespeichert.', 2000)
      })
  }

  deletePostit(p) {
    this.store.deletePostit(p._id)
      .then(success => {
        if (!success) {
          Materialize.toast('Fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Eintrag gelöscht.', 2000)
      })
  }

}
