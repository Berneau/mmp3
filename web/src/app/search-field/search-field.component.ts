import { Component, OnInit } from '@angular/core';

import { SearchService } from './../services/search.service'

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.less']
})
export class SearchFieldComponent implements OnInit {

  constructor(private store: SearchService) { }

  ngOnInit() {
  }

  search(word) {
    $('.button-collapse').sideNav('hide');
    this.store.search(word)
  }

}
