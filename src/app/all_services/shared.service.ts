import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  calculatePayableAmount(unpaidCount: any, grossSalary: any, netSalary: any) {
    return (netSalary - this.calculateLeaveDeduction(unpaidCount, grossSalary)).toFixed(2);
  }

  calculateLeaveDeduction(unpaidCount: any, grossSalary: any) {
    // const unpaidCount = (this.employeeUnpaidLeave[userId]) ? this.employeeUnpaidLeave[userId] : 0;
    const deductionAmount: any = (grossSalary / 30) * unpaidCount;
    return deductionAmount.toFixed(2);
  }
}
