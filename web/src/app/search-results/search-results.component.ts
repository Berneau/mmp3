import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from './../services/search.service'

import { Vendor } from './../interfaces/vendor'
import { Category } from './../interfaces/category'
import { Event } from './../interfaces/event'

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
})
export class SearchResultsComponent implements OnInit {

  vendorResults: Vendor[]
  productResults: Category[]
  eventResults: Event[]

  constructor(private SearchStore: SearchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params) => {
      let word = params['search']
      this.SearchStore.getVendorResults(word)
        .then(vendorResults => {
          if (!vendorResults) {
            this.vendorResults = []
            return
          }
          this.vendorResults = vendorResults
        })
      this.SearchStore.getProductResults(word)
        .then(productResults => {
          if (!productResults) {
            this.productResults = []
            return
          }
          this.productResults = productResults
        })
      this.SearchStore.getEventResults(word)
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
