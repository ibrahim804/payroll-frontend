import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveCategoryService {

  constructor(private authService: AuthService) { }

  getLeaveCategories() {
    return this.authService.getFromHTTP(apiRoutes.leaveCategories);
  }
}
