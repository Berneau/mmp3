import { Component, OnInit } from '@angular/core';

import { EventService } from './../services/event.service'

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})
export class EventListComponent implements OnInit {

  constructor(private store: EventService) { }

  ngOnInit() {
    this.store.getEvents()
  }

}
