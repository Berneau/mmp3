import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './../services/login.service'
import { VendorService } from './../services/vendor.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private store: LoginService, private VendorStore: VendorService) {
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
        .then(user => {
          if (!user) {
            // login failed
            Materialize.toast('Login failed', 2000)
          } else {
            // login successful
            if (user.isAdmin) {
              this.router.navigate(['/']) // TODO: Why can't navigate to /admin?
            }
            else {
              let vendor = this.VendorStore.getVendorByUserId(user._id)
              this.router.navigate(['/produzenten'])
            }
          }
        })
    }
    else Materialize.toast('Please fill in both fields', 2000)
  }

}
