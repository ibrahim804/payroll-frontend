import { apiRoutes } from './../config/apiRoutes';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private authService: AuthService) { }

  getRoles() {
    return this.authService.getFromHTTP(apiRoutes.roles);
  }

  getLeaders() {
    return this.authService.getFromHTTP(apiRoutes.leaders);
  }
}
