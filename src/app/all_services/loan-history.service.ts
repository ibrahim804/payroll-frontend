import { apiRoutes } from '../config/apiRoutes';
import { Create } from '../config/interfaces/loan-history.interface';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanHistoryService {

  constructor(private authService: AuthService) { }

  createLoanHistory(data: Create) {
    return this.authService.postInHTTP(apiRoutes.loanHistory, data);
  }

  getEmployeesHistory() {
    return this.authService.getFromHTTP(apiRoutes.loanHistories);
  }

  getLatestHistoryOfEach() {
    return this.authService.getFromHTTP(apiRoutes.loanLatestHistoryOfEach);
  }
}
