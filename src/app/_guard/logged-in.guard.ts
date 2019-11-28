import { urlRoutes } from './../config/apiRoutes';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../all_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([urlRoutes.dashboard]);
      return false;
      
    } else {
      return true;
    }
  }
  
}
