import { DialogConfirmationComponent } from './../dialogs/dialog-confirmation/dialog-confirmation.component';
import { LoanHistoryService } from './../all_services/loan-history.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-loan-pay-back',
  templateUrl: './loan-pay-back.component.html',
  styleUrls: ['./loan-pay-back.component.scss']
})
export class LoanPayBackComponent implements AfterViewInit, OnInit {

  displayedColumns = [ 'serial_no', 'name', 'department', 'designation',
                       'actual_loan_amount', 'current_loan_amount', 'previoud_paid', 'paid_amount', 'loan_status', 'approve'];
  payBackRequests = new MatTableDataSource<any>();
  searchKey: string;
  payBackIds = [];
  employeesIds = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private loanHistoryService: LoanHistoryService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    let responseData = [];
    let count = 1;
    this.loanHistoryService.getAllPendingPayBacks().subscribe(response => {
      // console.log(response);
      for (let i of response[0].loan_pay_backs) {
        responseData.push({
          serial_no: count,
          name: i.full_name,
          department: i.department,
          designation: i.designation,
          actual_loan_amount: i.actual_loan_amount,
          current_loan_amount: i.current_loan_amount,
          previoud_paid: i.previoud_paid,
          paid_amount: i.paid_amount,
          loan_status: ((i.loan_status).substring(0, 1)).toUpperCase() + (i.loan_status).substring(1, (i.loan_status).length),
        });
        count = count + 1;
        this.payBackIds.push(i.id);
        this.employeesIds.push(i.user_id);
      }
      this.payBackRequests.data = responseData;
      this.payBackRequests.sort = this.sort;
      this.payBackRequests.paginator = this.paginator;
      // console.log(this.loanRequests.data);
    });
  }

  // respondeToRequest(serialNo: number) {
  //   this.dialog.open(DialogLoanRequestComponent, {
  //     data: {
  //       name: this.payBackRequests.data[serialNo - 1].name,
  //       pfAmount: this.payBackRequests.data[serialNo - 1].provident_fund,
  //       reqAmount: this.payBackRequests.data[serialNo - 1].requested_amount,
  //       afterAcAmount:
  //         this.payBackRequests.data[serialNo - 1].provident_fund - this.payBackRequests.data[serialNo - 1].requested_amount,
  //     }
  //   }).afterClosed().subscribe(result => {
  //       // console.log(result);
  //       result = String(result);
  //       if (result === '-1') {
  //         alert('Ok, not responded');
  //       } else {
  //         const payload: Update = {
  //           approval_status: result,
  //         };
  //         this.loanRequestService.approveLoanRequest(this.payBackIds[serialNo - 1], payload).subscribe(response => {
  //           if (! this.checkError(response[0])) {
  //             // console.log(response[0]);
  //             if (result === '1') {
  //               alert('Loan Request Accepted');
  //             } else {
  //               alert('Loan Request Rejected');
  //             }
  //             this.setDataSource();
  //           }
  //         });
  //       }
  //   });
  // }

  acceptLoanPayBack(serialNo: number) {
    this.dialog.open(DialogConfirmationComponent, {
      data: {
        message: 'Pay Back Acceptance',
      }
    }).afterClosed().subscribe(dialogResponse => {
      if (dialogResponse === '0') {
        alert('OK, Not Approved');
      } else {
        const id = this.payBackIds[serialNo - 1];
        this.loanHistoryService.acceptLoanPayBack(id).subscribe(response => {
          if (! this.checkError(response[0])) {
            alert('Loan Pay Back Request Accepted');
            this.setDataSource();
          }
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.payBackRequests.filter = filterValue.trim().toLowerCase();
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

  ngAfterViewInit() {}

}
