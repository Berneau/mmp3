import { Injectable }           from '@angular/core'
import { Router, CanActivate }  from '@angular/router'

import { LoginService } from '../services/login.service'

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private LoginService: LoginService) { }

  canActivate() {
    return this.LoginService.isAdmin()
  }
}
