import { Create, SendMail } from './../config/interfaces/payment.interface';
import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private authService: AuthService) { }

  getPayments() {
    return this.authService.getFromHTTP(apiRoutes.payments);
  }

  makePayment(data: Create) {
    return this.authService.postInHTTP(apiRoutes.payment, data);
  }

  sendPaymentInMail(data: SendMail) { // testing needed
    return this.authService.postInHTTP(apiRoutes.paymentInMail, data);
  }

  getExportableData() {
    return this.authService.getFromHTTP(apiRoutes.exportSalarySheet);
  }
}
