import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vendor-short-info',
  templateUrl: './vendor-short-info.component.html',
  styleUrls: ['./vendor-short-info.component.less']
})
export class VendorShortInfoComponent implements OnInit {

  @Input() vendor: false

  constructor() { }

  ngOnInit() {
  }

}
