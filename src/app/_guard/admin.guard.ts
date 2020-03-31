import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../all_services/auth.service';
import { role } from '../config/payroll.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.getCurrentRole() == role.ADMIN) {
      return true;
    } else {
      // this.router.navigate([urlRoutes.dashboard]);
      this.router.navigate([this.router.url]);
      return false;
    }
  }

}
