import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Update } from './../config/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) { }

  getLoggedInEmployee() {
    return this.authService.getFromHTTP(apiRoutes.userMe);
  }

  getEmployees() {
    return this.authService.getFromHTTP(apiRoutes.users);
  }

  getEmployeeDeptDesgIds(userId: string) {
    return this.authService.getFromHTTP(`${apiRoutes.userDeptDesgIds}/${userId}`);
  }

  update(credentials: Update) {
    return this.authService.postInHTTP(apiRoutes.update, credentials);
  }

}
