import { urlRoutes } from './../config/apiRoutes';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../all_services/auth.service';
import { role } from '../config/payroll.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.getCurrentRole()==role.ADMIN) {
      return true;
    } else {
      // this.router.navigate([urlRoutes.dashboard]);
      this.router.navigate([this.router.url]);

      return false;
    }
  }

}
