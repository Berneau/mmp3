import { Component, OnInit } from '@angular/core';

import { LoginService } from './../services/login.service'

@Component({
  selector: 'footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.sass']
})
export class FooterBarComponent implements OnInit {

  constructor(private store: LoginService) { }

  ngOnInit() {
    console.log(this.store.currentUser)
  }

}
