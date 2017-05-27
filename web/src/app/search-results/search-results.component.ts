import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Vendor } from './../interfaces/vendor'
import { Category } from './../interfaces/category'
import { Event } from './../interfaces/event'

import { SearchService } from './../services/search.service'

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
})
export class SearchResultsComponent implements OnInit {

  vendorResults: Vendor[]
  productResults: Category[]
  eventResults: Event[]

  constructor(private store: SearchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params) => {
      let word = params['search']
      this.store.getVendorResults(word)
        .then(vendorResults => {
          if (!vendorResults) {
            this.vendorResults = []
            return
          }
          this.vendorResults = vendorResults
        })
      this.store.getProductResults(word)
        .then(productResults => {
          if (!productResults) {
            this.productResults = []
            return
          }
          this.productResults = productResults
        })
      this.store.getEventResults(word)
        .then(eventResults => {
          if (!eventResults) {
            this.eventResults = []
            return
          }
          this.eventResults = eventResults
        })
    })
  }

}
