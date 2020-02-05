import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Update } from './../config/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) { }

  // getEmployee(employeeId: string) {
  //   return this.authService.getFromHTTP(`${apiRoutes.user}/${employeeId}`);
  // }

  getLoggedInEmployee() {
    return this.authService.getFromHTTP(apiRoutes.userMe); // to do now
  }

  getEmployees() {
    return this.authService.getFromHTTP(apiRoutes.users);
  }

  getEmployeeDeptDesgIds(userId: string) {
    return this.authService.getFromHTTP(`${apiRoutes.userDeptDesgIds}/${userId}`);
  }

  // updateEmployee(employee: Update, id: string) {
  //   return this.authService.postInHTTP(`${apiRoutes.update}/${id}`, employee);
  // }

  // deleteEmployee(id: string) {
  //   this.authService.getFromHTTP(`${apiRoutes.delete}/${id}`);
  // }

}
