import { Create } from './../config/interfaces/payment.interface';
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

  sendPaymentInMail(userId: string) {
    return this.authService.getFromHTTP(`${apiRoutes.paymentInMail}/${userId}`);
  }
}
