import { Component, Input, OnInit } from '@angular/core';

import { Postit } from './../interfaces/postit'
import { PostitService } from './../services/postit.service'

@Component({
  selector: 'postit-list',
  templateUrl: './postit-list.component.html',
  styleUrls: ['./postit-list.component.less']
})
export class PostitListComponent implements OnInit {

  @Input() confirm: false
  postits: Postit[]

  constructor(private store: PostitService) { }


  ngOnInit() {
    this.store.getPostits(this.confirm)
    .then(postits => {
      if (!postits) {
        Materialize.toast('Es wurde keine Schlachtbretteinträge gefunden.', 2000)
        return
      }
      this.postits = postits
    })
  }

}
