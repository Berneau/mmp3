import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize';

import { User } from './../interfaces/user'

import { UserService } from './../services/user.service'

import { VendorFormComponent } from './../vendor-form/vendor-form.component'

import { PasswordValidation } from './../helpers/password-confirmation'

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
        email: [{ value: this.user.email, disabled: true }, Validators.required],
        password: [this.user.password, [Validators.required, Validators.minLength(this.store.passwordLength)]],
        passwordConfirm: ['', Validators.required],
        isAdmin: [false, Validators.required]
      }, {
          validator: PasswordValidation.MatchPassword // checks if password and passwordConfirm matches
        });
    }
    else {
      this.userForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(this.store.passwordLength)]],
        passwordConfirm: ['', Validators.required],
        isAdmin: [false, Validators.required]
      }, {
          validator: PasswordValidation.MatchPassword // checks if password and passwordConfirm matches
        });
    }
  }

  submit() {
    if (this.userForm.valid) {
      if (this.user) {
        this.updateUser(this.user)
      }
      else {
        this.newUser()
      }
      this.modalComponent.close()
    }
    else {
      Materialize.toast('Kontrollieren Sie bitte alle Felder.', 2000)
    }
  }

  newUser() {
    this.store.addUser(this.userForm.value)
      .then(user => {
        if (!user) {
          Materialize.toast('Hinzufügen fehlgeschlagen.', 2000)
          return
        }
        else {
          this.modalService.open(VendorFormComponent, { user: user });
        }
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
