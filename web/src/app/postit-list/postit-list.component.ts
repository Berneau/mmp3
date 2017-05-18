import { Component, Input, OnInit } from '@angular/core';

import { PostitService } from './../services/postit.service'

@Component({
  selector: 'postit-list',
  templateUrl: './postit-list.component.html',
  styleUrls: ['./postit-list.component.less']
})
export class PostitListComponent implements OnInit {

  constructor(private store: PostitService) { }

  @Input() confirm: false

  ngOnInit() {
    this.store.getPostits(this.confirm)
  }

}
