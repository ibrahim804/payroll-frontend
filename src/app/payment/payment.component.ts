import { AuthService } from 'src/app/all_services/auth.service';
import { DialogConfirmationComponent } from './../dialogs/dialog-confirmation/dialog-confirmation.component';
import { ProvidentFundService } from '../all_services/provident-fund.service';
import { Create as PF } from './../config/interfaces/provident-fund.interface';
import { Create as PAY, SendMail } from './../config/interfaces/payment.interface';
import { UserService } from './../all_services/user.service';
import { PaymentService } from './../all_services/payment.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { combineLatest } from 'rxjs';
import { DialogSalaryDetailsComponent } from '../dialog-salary-details/dialog-salary-details.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewInit, OnInit {

  employees: any;

  displayedColumns = [ 'serial_no', 'name', 'department', 'designation', 'payable_amount', 'view_details', 'payment'];
  payments = new MatTableDataSource<any>();
  searchKey: string;
  employeeIds = [];
  alreadyPaidIds = [];
  employeeUnpaidLeave = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
    private providentFundService: ProvidentFundService,
    private dialog: MatDialog,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    let responseData = [];
    let count = 1;
    combineLatest(
      this.userService.getEmployees(),
      this.paymentService.getPayments(),
    ).subscribe(combinedResponse => {
      this.alreadyPaidIds = combinedResponse[1][0].payments_user_id;
      this.employeeUnpaidLeave = combinedResponse[1][0].userCountMap;
      for (let i of combinedResponse[0][0].users) {
        responseData.push({
          serial_no: count,
          name: i.full_name,
          department: i.department,
          designation: i.designation,
          net_salary: i.salary,
          payableAmount: this.calculatePayableAmount(i.id, i.salary),
          isActive: this.alreadyPaidIds.indexOf(i.id) === -1,
          label: (this.alreadyPaidIds.indexOf(i.id) === -1) ? 'Make Payment' : 'Already Paid',
          class: (this.alreadyPaidIds.indexOf(i.id) === -1) ?
            'btn btn-success btn-sm mr-1' : 'btn btn-dark btn-sm mr-1',
        });
        count = count + 1;
        this.employeeIds.push(i.id);
      }
      this.payments.data = responseData;
      this.payments.sort = this.sort;
      this.payments.paginator = this.paginator;
    });
  }

  calculatePayableAmount(userId: string, netSalary: any) {
    const unpaidCount = (this.employeeUnpaidLeave[userId]) ? this.employeeUnpaidLeave[userId] : 0;
    const payableAmount: any = (netSalary / 22) * (22 - unpaidCount);
    return payableAmount.toFixed(2);
  }

  calculateLeaveDeduction(userId: string, netSalary: any) {
    const unpaidCount = (this.employeeUnpaidLeave[userId]) ? this.employeeUnpaidLeave[userId] : 0;
    const deductionAmount: any = (netSalary / 22) * unpaidCount;
    return deductionAmount.toFixed(2);
  }

  redirectsToDetails(serialNo: number) {
    this.dialog.open(DialogSalaryDetailsComponent, {
      data: {
        id: this.employeeIds[serialNo - 1],
        name: this.payments.data[serialNo - 1].name,
        isExpanded: true,
        unpaidLeave: (this.employeeUnpaidLeave[this.employeeIds[serialNo - 1]]) ?
                      this.employeeUnpaidLeave[this.employeeIds[serialNo - 1]] : 0,
      }
    });
  }

  redirectsToMakePayment(serialNo: number) {
    const payload: PAY = {
      user_id: String(this.employeeIds[serialNo - 1]),
      employee_monthly_cost: this.calculateLeaveDeduction(
        this.employeeIds[serialNo - 1], this.payments.data[serialNo - 1].net_salary
      ),
      payable_amount: this.payments.data[serialNo - 1].payableAmount,
    };
    this.dialog.open(DialogConfirmationComponent, {
      data: {message: 'Make Payment'}
    }).afterClosed().subscribe(result => {
      if (result === '1') {
        this.authService.showSpinner();
        this.paymentService.makePayment(payload).subscribe(response => {
          if (! this.checkError(response[0])) {
            this.depositProvidentFund(payload.user_id);
          } else {
            this.authService.hideSpinner();
          }
        });
      }
    });
  }

  depositProvidentFund(userId: string) {
    const payload: PF = {
      user_id: userId,
    };
    this.providentFundService.createProvidentFund(payload).subscribe(response => {
      if (! this.checkError(response[0])) {
        this.setDataSource();
        // alert('Payment Done. Provident Fund Increased');
        const mailPayload: SendMail = {
          user_id: userId
        };
        this.paymentService.sendPaymentInMail(mailPayload).subscribe(mailResponse => {
          console.log(mailResponse);
          this.authService.hideSpinner();
        }, (err) => {
          this.authService.hideSpinner();
        });
      } else {
        this.authService.hideSpinner();
      }
    });
  }

  applyFilter(filterValue: string) {
    this.payments.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {}

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

}
