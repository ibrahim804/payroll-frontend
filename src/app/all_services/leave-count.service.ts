import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveCountService {

  constructor(private authService: AuthService) { }

  getLeaveCountsOfEmployee() {
    return this.authService.getFromHTTP(apiRoutes.leaveCountsOfAUser);
  }
}
