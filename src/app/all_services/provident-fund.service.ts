import { Create } from './../config/interfaces/provident-fund.interface';
import { apiRoutes } from '../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvidentFundService {

  constructor(private authService: AuthService) { }

  createProvidentFund(data: Create) {
    return this.authService.postInHTTP(apiRoutes.providentFund, data);
  }
}
