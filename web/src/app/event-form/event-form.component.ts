import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Event } from './../interfaces/event'

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.less']
})
export class EventFormComponent implements OnInit {

  eventForm: FormGroup
  @Input() event: Event

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm()
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15,
      today: 'heute',
      clear: '❌',
      close: '✔',
      format: 'dd. mmmm yyyy',
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

}
