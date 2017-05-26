import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../services/login.service'

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private LoginService: LoginService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.LoginService.isAdmin()){
        this.router.navigate(['/404'])
      }
    return this.LoginService.isAdmin()
  }
}
