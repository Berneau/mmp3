import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize';

import { User } from './../interfaces/user'

import { UserService } from './../services/user.service'

import { VendorFormComponent } from './../vendor-form/vendor-form.component'

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent extends MzBaseModal {

  constructor(private fb: FormBuilder, private store: UserService, private modalService: MzModalService) {
    super()
  }

  userForm: FormGroup
  @Input() user: User
  isAdmin: boolean

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    if (this.user) {
      this.userForm = this.fb.group({
        email: this.user.email,
        password: this.user.password,
        passwordConfirm: this.user.password,
        isAdmin: false
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

  newUser() {
    this.store.addUser(this.userForm.value)
      .then(user => {
        if (!user) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        this.modalService.open(VendorFormComponent, {user: user});
      })
  }

  updateUser(u) {
    this.store.updateUser(u, this.userForm.value)
    .then(user => {
      if (!user) {
        Materialize.toast('Bearbeitung fehlgeschlagen.', 2000)
        return
      }
      Materialize.toast('Änderungen gespeichert.', 2000)
    })
  }

}
