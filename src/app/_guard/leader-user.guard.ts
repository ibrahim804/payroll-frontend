import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../all_services/auth.service';
import { role } from '../config/payroll.enum';

@Injectable({
  providedIn: 'root'
})
export class LeaderUserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (
      this.authService.getCurrentRole() == role.LEADER ||
      this.authService.getCurrentRole() == role.USER
    ) {
      return true;
    } else {
      this.router.navigate([this.router.url]);
      return false;
    }
  }
}
