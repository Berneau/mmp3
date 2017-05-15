import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PostitService } from './../services/postit.service'
import { LoginService } from './../services/login.service'

import { Postit } from './../interfaces/postit'

@Component({
  selector: 'postit-detail',
  templateUrl: './postit-detail.component.html',
  styleUrls: ['./postit-detail.component.less']
})
export class PostitDetailComponent implements OnInit {

  postit: Postit

  constructor(private store: PostitService, private LoginStore: LoginService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((params) => {
      let id = params['id']
      this.store.getPostit(id)
        .then(postit => {
          if (!postit) {
            this.location.back() // TODO: is location.back() sinnvoll ?
            Materialize.toast('Es wurde kein Schlachtbrett-Eintrag mit dieser ID gefunden.', 2000)
            return
          }
          this.postit = postit
        })
    })
  }

  confirmPostit() {
    console.log("confirm")
  }

  deletePostit() {
    console.log("delete")
  }

}
