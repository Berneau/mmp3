import { Injectable }           from '@angular/core'
import { Router, CanActivate }  from '@angular/router'

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    // if user is admin is found -> return true

    this.router.navigate(['/'])
    // else return false
  }
}
