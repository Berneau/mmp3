import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize';

import { Postit } from './../interfaces/postit'
import { Vendor } from './../interfaces/vendor'

import { PostitService } from './../services/postit.service'
import { LoginService } from './../services/login.service'
import { VendorService } from './../services/vendor.service'

import { PostitFormComponent } from './../postit-form/postit-form.component'
import { DeleteConfirmationComponent } from './../delete-confirmation/delete-confirmation.component'

@Component({
  selector: 'postit-detail',
  templateUrl: './postit-detail.component.html',
  styleUrls: ['./postit-detail.component.less']
})
export class PostitDetailComponent extends MzBaseModal {

  postit: Postit
  vendor: Vendor

  constructor(private store: PostitService, private route: ActivatedRoute, private LoginStore: LoginService, private VendorStore: VendorService, private modalService: MzModalService) {
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
        this.modalComponent.close()
      })
  }

  deletePostit(p) {
    this.modalService.open(DeleteConfirmationComponent, { name: p.name })
    $('delete-confirmation #deletionConfirmedButton').on('click', () => {
      this.store.deletePostit(p._id)
        .then(success => {
          if (!success) {
            Materialize.toast('Fehlgeschlagen.', 2000)
            return
          }
          Materialize.toast('Eintrag gelöscht.', 2000)
          this.modalComponent.close()
        })
    })
  }

  openUpdatePostitModal(p) {
    this.postit = p
    this.modalService.open(PostitFormComponent, { postit: this.postit, vendor: this.vendor });
  }

}
