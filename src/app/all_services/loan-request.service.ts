import { apiRoutes } from '../config/apiRoutes';
import { Create, Update } from '../config/interfaces/loan-request.interface';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {

  constructor(private authService: AuthService) { }

  getActualPF_OnLoan_AvailablePF() {
    return this.authService.getFromHTTP(apiRoutes.userMe);
  }

  requestForLoan(data: Create) {
    return this.authService.postInHTTP(apiRoutes.loanRequest, data);
  }

  getPendingRequetst() {
    return this.authService.getFromHTTP(apiRoutes.loanRequests);
  }

  approveLoanRequest(id: string, data: Update) {
    return this.authService.postInHTTP(`${apiRoutes.loanRequest}/${id}`, data);
  }
}
