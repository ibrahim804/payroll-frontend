import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Login } from '../config/interfaces/user.interface';
import { Update, Register } from './../config/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) { }

  login(credentials: Login) {
    return this.authService.postInHTTP(apiRoutes.login, credentials);
  }

  register(credentials: Register) {
    return this.authService.postInHTTP(apiRoutes.register, credentials);
  }

  getEmployee(employeeId: string) {
    return this.authService.getFromHTTP(`${apiRoutes.user}/${employeeId}`);
  }

  getEmployees() {
    return this.authService.getFromHTTP(apiRoutes.users);
  }

  updateEmployee(employee: Update, id: string) {
    return this.authService.postInHTTP(`${apiRoutes.update}/${id}`, employee);
  }

  deleteEmployee(id: string) {
    this.authService.getFromHTTP(`${apiRoutes.delete}/${id}`);
  }

  

}
