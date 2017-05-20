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
  categoryResults: Category[]
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
          console.log(vendorResults)
          this.vendorResults = vendorResults
          console.log(this.vendorResults)
        })
      this.SearchStore.getCategoryResults(word)
        .then(categoryResults => {
          if (!categoryResults) {
            this.categoryResults = []
            return
          }
          console.log(categoryResults)
          this.categoryResults = categoryResults
          console.log(this.categoryResults)
        })
      this.SearchStore.getEventResults(word)
        .then(eventResults => {
          if (!eventResults) {
            this.eventResults = []
            return
          }
          console.log(eventResults)
          this.eventResults = eventResults
          console.log(this.eventResults)
        })
    })
  }

}
