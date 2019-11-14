import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationServiceService, private router: Router){}

  canActivate(): boolean{
    if(this.authService.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
