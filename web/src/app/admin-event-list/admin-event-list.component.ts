import { Component, Input, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { Event } from './../interfaces/event'

import { EventService } from './../services/event.service'

import { EventFormComponent } from './../event-form/event-form.component'
import { DeleteConfirmationComponent } from './../delete-confirmation/delete-confirmation.component'

@Component({
  selector: 'admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.less']
})
export class AdminEventListComponent implements OnInit {

  selectedEvent: Event

  constructor(private store: EventService, private modalService: MzModalService) { }

  ngOnInit() {
    this.store.getEvents()
  }

  selectEvent(event: Event) {
    this.selectedEvent = event
    this.modalService.open(EventFormComponent, { event: this.selectedEvent });
  }

  deleteEvent(e) {
    this.modalService.open(DeleteConfirmationComponent, { name: e.name })
    $('delete-confirmation #deletionConfirmedButton').on('click', () => {
      this.store.deleteEvent(e._id)
        .then(success => {
          if (!success) {
            Materialize.toast('Fehlgeschlagen.', 2000)
            return
          }
          Materialize.toast('Eintrag gelöscht.', 2000)
        })
    })
  }

}
