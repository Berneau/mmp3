import { Component, OnInit } from '@angular/core';

import { LoginService } from './../services/login.service'

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.less']
})
export class HeaderBarComponent implements OnInit {

  constructor(public LoginStore: LoginService) {
  }

  ngOnInit() {
  }


}
