import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize';

import { PostitService } from './../services/postit.service'
import { LoginService } from './../services/login.service'
import { VendorService } from './../services/vendor.service'

import { Postit } from './../interfaces/postit'
import { Vendor } from './../interfaces/vendor'

import { PostitFormComponent } from './../postit-form/postit-form.component'

@Component({
  selector: 'postit-detail',
  templateUrl: './postit-detail.component.html',
  styleUrls: ['./postit-detail.component.less']
})
export class PostitDetailComponent extends MzBaseModal {

  postit: Postit
  vendor: Vendor

  constructor(private store: PostitService, private LoginStore: LoginService, private VendorStore: VendorService, private route: ActivatedRoute, private modalService: MzModalService) {
    super()
  }

  ngOnInit() {
    if (this.postit.vendorId) {
      this.VendorStore.getVendor(this.postit.vendorId)
        .then(v => {
          if (!v) {
            this.vendor = null
            return
          }
          this.vendor = v
        })
    }
  }

  confirmPostit(p) {
    this.store.confirmPostit(p)
      .then(postit => {
        if (!postit) {
          Materialize.toast('Bestätigung fehlgeschlagen.', 2000)
          return
        }
        this.postit = postit
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

  openUpdatePostitModal(p) {
    this.postit = p
    this.modalService.open(PostitFormComponent, {postit: this.postit, vendor: this.vendor});
  }

}
