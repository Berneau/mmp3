import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from './../interfaces/user'

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  userForm: FormGroup
  @Input() user: User

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.user) {
      this.userForm = this.fb.group({
        email: this.user.email,
        password: this.user.password,
        passwordConfirm: this.user.password,
        isAdmin: this.user.isAdmin
      });
    }
    else {
      this.userForm = this.fb.group({
        email: '',
        password: '',
        passwordConfirm: '',
        isAdmin: false
      });
    }
  }

}
