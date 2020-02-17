import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../all_services/auth.service';
import { role } from '../config/payroll.enum';
import { urlRoutes } from '../config/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private activeRoute:ActivatedRoute) { }

  canActivate(): boolean {
    if (this.authService.getCurrentRole()==role.USER) {
      return true;
    } else {
      // this.router.navigate([this.activeRoute.snapshot.params]);
      // this.router.navigate([urlRoutes.dashboard]);
      this.router.navigate([this.router.url]);


      return false;
    }
  }

}
