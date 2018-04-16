import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("authenticated", this.auth.authenticated);
    console.log("auth", this.auth);
    let access: boolean;

    setTimeout(() => {
      if (this.auth.authenticated) {
        access = true;
      } else {
        console.error('access denied', access);
        this.router.navigate(['/login']);
        access = false;
      }
    }, 3000)

    return access;
  }

}
