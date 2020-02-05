import { Create, Update } from './../config/interfaces/salary.interface';
import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private authService: AuthService) { }

  getSalaries() {
    return this.authService.getFromHTTP(apiRoutes.salaries);
  }

  getSalary(id: string) {
    return this.authService.getFromHTTP(`${apiRoutes.salary}/${id}`);
  }

  getMySalary() {
    return this.authService.getFromHTTP(apiRoutes.salaryMine);
  }

  createSalary(data: Create) {
    return this.authService.postInHTTP(apiRoutes.salary, data);
  }

  updateSalary(userId: string, data: Update) {
    return this.authService.postInHTTP(`${apiRoutes.salary}/${userId}`, data);
  }
}
