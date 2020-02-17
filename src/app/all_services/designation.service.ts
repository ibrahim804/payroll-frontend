import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { apiRoutes } from '../config/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private authService: AuthService) { }

  getDesignations() {
    return this.authService.getFromHTTP(apiRoutes.designations);
  }

  getDesignationsOfThisDepartment(id: string) {
    return this.authService.getFromHTTP(`${apiRoutes.department}/${id}/designations`);
  }
}
