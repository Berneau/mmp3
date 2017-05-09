import { Component, OnInit } from '@angular/core';

import { LoginService } from './../services/login.service'

@Component({
  selector: 'footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.less']
})
export class FooterBarComponent implements OnInit {

  constructor(public LoginStore: LoginService) { }

  ngOnInit() {
  }

}
