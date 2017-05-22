import { Component, Input, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { Postit } from './../interfaces/postit'

import { PostitService } from './../services/postit.service'

import { PostitDetailComponent } from './../postit-detail/postit-detail.component'

@Component({
  selector: 'admin-postit-list',
  templateUrl: './admin-postit-list.component.html',
  styleUrls: ['./admin-postit-list.component.less']
})
export class AdminPostitListComponent implements OnInit {

  @Input() confirmed: boolean
  selectedPostit: Postit

  constructor(private store: PostitService, private modalService: MzModalService) { }

  ngOnInit() {
    this.store.getPostits()
  }

  selectPostit(postit: Postit) {
    this.selectedPostit = postit
    this.modalService.open(PostitDetailComponent, {postit: this.selectedPostit});
  }

}
