import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { Event } from './../interfaces/event'

import { EventService } from './../services/event.service'

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.less']
})
export class EventFormComponent extends MzBaseModal {

  eventForm: FormGroup
  @Input() event: Event

  constructor(private fb: FormBuilder, private store: EventService) {
    super()
  }

  ngOnInit() {
    this.createForm()
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15,
      today: 'heute',
      clear: '❌',
      close: '✔',
      format: 'yyyy/mm/dd',
      formatSubmit: 'yyyy/mm/dd',
      monthsFull: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      weekdaysFull: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      showMonthsShort: undefined,
      showWeekdaysFull: undefined,
      labelMonthNext: 'Nächster Monat',
      labelMonthPrev: 'Vorheriger Monat',
      labelMonthSelect: 'Monat auswählen',
      labelYearSelect: 'Jahr auswählen',
      firstDay: 1,
      min: true
    });

    $('.datepicker').change('input', (e) => {
      let date = $(e.target).val()
      this.eventForm.patchValue({ date: date })
    })
  }

  createForm() {
    if (this.event) {
      this.eventForm = this.fb.group({
        name: this.event.name,
        date: this.event.date,
        description: this.event.description,
        location: this.fb.group({
          name: this.event.location.name,
          lat: this.event.location.lat,
          long: this.event.location.long
        })
      });
    }
    else {
      this.eventForm = this.fb.group({
        name: '',
        date: '',
        description: '',
        location: this.fb.group({
          name: '',
          lat: '',
          long: ''
        })
      });
    }
  }

  newEvent() {
    this.store.addEvent(this.eventForm.value)
      .then(event => {
        if (!event) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Event gespeichert.', 2000)
      })
  }

  updateEvent(p) {
    this.store.updateEvent(p, this.eventForm.value)
      .then(event => {
        if (!event) {
          Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
          return
        }
        Materialize.toast('Änderungen gespeichert.', 2000)
      })
  }

}
