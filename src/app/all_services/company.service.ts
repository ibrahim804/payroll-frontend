import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private authService: AuthService) { }

  getMotherCompany() {
    return this.authService.getFromHTTP(apiRoutes.company + '/1');
  }
}
