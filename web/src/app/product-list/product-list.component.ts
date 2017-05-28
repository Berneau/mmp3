import { Component, Input, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { Vendor } from './../interfaces/vendor'
import { Product } from './../interfaces/product'

import { ProductService } from './../services/product.service'
import { LoginService } from './../services/login.service'

import { ProductFormComponent } from './../product-form/product-form.component'
import { DeleteConfirmationComponent } from './../delete-confirmation/delete-confirmation.component'

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  selectedProduct: Product
  vendorProducts: Product[]
  @Input() vendor: Vendor

  constructor(private store: ProductService, private LoginStore: LoginService, private modalService: MzModalService) { }

  ngOnInit() {
    this.getVendorProducts()
  }

  getVendorProducts() {
    this.store.getVendorProducts(this.vendor._id)
      .then((products) => {
        this.vendorProducts = products
      })
  }

  selectProduct(product: Product) {
    this.selectedProduct = product
    this.modalService.open(ProductFormComponent, { product: this.selectedProduct, vendor: this.vendor });
  }

  deleteProduct(p) {
    this.modalService.open(DeleteConfirmationComponent, { name: p.name })
    $('delete-confirmation #deletionConfirmedButton').on('click', () => {
      this.store.deleteProduct(p._id, p.vendor)
        .then(success => {
          if (!success) {
            Materialize.toast('Fehlgeschlagen.', 2000)
            return
          }
          this.getVendorProducts()
          Materialize.toast('Eintrag gelöscht.', 2000)
        })
    })
  }

}
