import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './../services/login.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: LoginService) {
    this.createForm();
  }

  ngOnInit() {
      this.store.logout()
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.store.login(this.loginForm.value.email, this.loginForm.value.password)
      .then(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/'])
        } else {
          // login failed
          Materialize.toast('Login failed', 2000)
        }
      })
    }
    else Materialize.toast('Please fill in both fields', 2000)
  }

}
