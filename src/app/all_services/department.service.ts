import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { apiRoutes } from '../config/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private authService: AuthService) { }

  getAllDepartments() {
    return this.authService.getFromHTTP(apiRoutes.departments);
  }

  getUserOfDeptXDesgY(departmentId: any, designationId: any) {
    return this
      .authService
      .getFromHTTP(`${apiRoutes.department}/${departmentId}/designation/${designationId}`);
  }

}
