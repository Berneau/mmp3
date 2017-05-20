import { Component, OnInit } from '@angular/core';

import { SearchService } from './../services/search.service'

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.less']
})
export class SearchFieldComponent implements OnInit {

  constructor(private SearchStore: SearchService) { }

  ngOnInit() {
  }

  search(word) {
    this.SearchStore.search(word)
  }

}
