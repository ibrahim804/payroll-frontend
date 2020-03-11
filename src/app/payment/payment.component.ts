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
import { SharedService } from '../all_services/shared.service';

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
    private authService: AuthService,
    private sharedService: SharedService
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
      this.employeeUnpaidLeave = combinedResponse[1][0].userCountMap; // key->value  (user_id -> total_unpaid_leave_count_of_this_month)
      for (let i of combinedResponse[0][0].users) {
        responseData.push({
          serial_no: count,
          name: i.full_name,
          department: i.department,
          designation: i.designation,
          net_salary: i.salary,
          gross_salary: i.gross_salary,
          payableAmount: this.sharedService.calculatePayableAmount(
            (this.employeeUnpaidLeave[i.id]) ? this.employeeUnpaidLeave[i.id] : 0,
            i.gross_salary,
            i.salary
          ),
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
      employee_monthly_cost: this.sharedService.calculateLeaveDeduction(
        (this.employeeUnpaidLeave[this.employeeIds[serialNo - 1]]) ? this.employeeUnpaidLeave[this.employeeIds[serialNo - 1]] : 0,
        this.payments.data[serialNo - 1].gross_salary
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
          user_id: userId,
          unpaid_leave_count: (this.employeeUnpaidLeave[userId] == null) ? String(0) : String(this.employeeUnpaidLeave[userId])
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

  exportSalarySheet() {
    this.paymentService.getExportableData().subscribe(response => {
      
      // console.log(response[0].sheet);
      let exportableData = [];
  
      for(let element of response[0].sheet) {
        exportableData.push({
          basic_salary: element.basic_salary,
          house_rent_allowance: element.house_rent_allowance,
          medical_allowance: element.medical_allowance,
          special_allowance: element.special_allowance,
          fuel_allowance: element.fuel_allowance,
          phone_bill_allowance: element.phone_bill_allowance,
          other_allowance: element.other_allowance,
          tax_deduction: element.tax_deduction,
          provident_fund: element.provident_fund,
          other_deduction: element.other_deduction,
          gross_salary: element.gross_salary,
          total_deduction: element.total_deduction,
          net_salary: element.net_salary,
          unpaid_leave_taken: element.unpaid_leave_taken,
          deduction_leave: element.deduction_leave,
          payable_amount: element.payable_amount,
        });
      }

      this.sharedService.exportExcelSheet(exportableData, this.getTodayDate());
      /* PARAM 1: MUST BE A TYPE SalarySheet, PARAM 2: FILENAME WITHOUT EXTENSION */
    });
  }

  getTodayDate() {
    const date = new Date();
    return String(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
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
