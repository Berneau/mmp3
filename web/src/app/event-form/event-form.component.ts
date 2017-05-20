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
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
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
