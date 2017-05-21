import { Component, Input, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { Postit } from './../interfaces/postit'
import { PostitService } from './../services/postit.service'
import { PostitDetailComponent } from './../postit-detail/postit-detail.component'

@Component({
  selector: 'postit-list',
  templateUrl: './postit-list.component.html',
  styleUrls: ['./postit-list.component.less']
})
export class PostitListComponent implements OnInit {

  @Input() confirm: false
  postits: Postit[]
  selectedPostit: Postit

  constructor(private store: PostitService, private modalService: MzModalService) { }


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

  selectPostit(postit: Postit) {
    this.selectedPostit = postit
    this.modalService.open(PostitDetailComponent, {postit: this.selectedPostit});
  }

}
