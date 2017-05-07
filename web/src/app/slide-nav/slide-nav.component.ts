import { Component, OnInit } from '@angular/core';

import { LoginService } from './../services/login.service'

@Component({
  selector: 'slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.sass']
})
export class SlideNavComponent implements OnInit {

  constructor(private LoginStore: LoginService) { }

  ngOnInit() {
  }

}
