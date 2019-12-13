import { DialogPayLoanComponent } from './../dialogs/dialog-pay-loan/dialog-pay-loan.component';
import { combineLatest } from 'rxjs';
import { Create as LRequest } from './../config/interfaces/loan-request.interface';
import { Create as LPay } from './../config/interfaces/loan-history.interface';
import { LoanHistoryService } from './../all_services/loan-history.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ApplyLoanRequestComponent } from '../apply-loan-request/apply-loan-request.component';
import { LoanRequestService } from '../all_services/loan-request.service';

@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.component.html',
  styleUrls: ['./loan-history.component.scss']
})
export class LoanHistoryComponent implements AfterViewInit, OnInit {

  displayedColumns = [ 'serial_no', 'year', 'month', 'month_count',
                        'actual_loan_amount', 'yearly_interest_rate', 'current_loan_amount', 'paid_amount', 'loan_status'];
  loanHistories = new MatTableDataSource<any>();
  searchKey: string;
  loanHistoryIds = [];

  isActive: boolean;

  latestLoanAmount: any = null;
  actualLoan: any = null;
  latestAlreadyPaid: any = null;
  latestMonth: any = null;
  latestYear: any = null;
  latestMonthCount: any = null;

  payLoanLabel: string;
  payLoanDisabled: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private loanHistoryService: LoanHistoryService,
    private dialog: MatDialog,
    private loanRequestService: LoanRequestService,
  ) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDefaultValues() {
    this.latestLoanAmount = null;
    this.actualLoan = null;
    this.latestAlreadyPaid = null;
    this.latestMonth = null;
    this.latestYear = null;
    this.latestMonthCount = null;
    this.payLoanLabel = 'Pay Loan';
    this.payLoanDisabled = false;
  }

  setDataSource() {
    this.setDefaultValues();

    combineLatest(
      this.loanRequestService.checkForPendingRequest(),
      this.loanHistoryService.checkIfAlreadyPaid(), // for this month and year
    ).subscribe(combinedResponse => {
      if (combinedResponse[0][0].status === 'FAILED') {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
      let responseData = [];
      let count = 1;
      this.loanHistoryService.getEmployeesHistory().subscribe(response => {
        for (let i of response[0].loan_histories) {
          responseData.push({
            serial_no: count,
            month: i.month,
            year: i.year,
            month_count: this.ordinal_suffix_of(i.month_count + 1),
            actual_loan_amount: i.actual_loan_amount + ' TK',
            yearly_interest_rate: i.yearly_interest_rate,
            current_loan_amount: i.current_loan_amount + ' TK',
            paid_amount: i.paid_amount + ' TK',
            loan_status:
              ((i.loan_status).substring(0, 1)).toUpperCase() + (i.loan_status).substring(1, (i.loan_status).length),
          });
          count = count + 1;
          this.loanHistoryIds.push(i.id);
          if (this.latestLoanAmount == null) {
            this.latestLoanAmount = i.current_loan_amount;
            this.actualLoan = i.actual_loan_amount;
            this.latestAlreadyPaid = i.paid_amount;
            this.latestYear = i.year;
            this.latestMonth = this.getNumFromMonthList(i.month);
            this.latestMonthCount = i.month_count;
          }
        }
        if (this.latestLoanAmount === 0) {
          this.payLoanLabel = 'Loan Fully Paid';
          this.payLoanDisabled = true;
        } else if (combinedResponse[1][0].status === 'FAILED') {
          this.payLoanLabel = 'Paid This Month';
          this.payLoanDisabled = true;
        }
        this.loanHistories.data = responseData;
        this.loanHistories.sort = this.sort;
        this.loanHistories.paginator = this.paginator;
      });
    });
  }

  redirectsToLoanApply() {
    this.loanRequestService.getActualPF_OnLoan_AvailablePF().subscribe(response => {
      const myConsiderableAmounts = response[0].description;
      this.dialog.open(ApplyLoanRequestComponent, {
        data: {
          message: 'Make Your Loan Request',
          responses: myConsiderableAmounts,
        }
      }).afterClosed().subscribe(result => {
        if (result.availablePF === -1) {
          // do nothing
        } else if (result.requestedAmount <= 0 || result.requestedAmount > result.availablePF) {
          alert('Requested Amount is not in range');
        } else if (isNaN(result.requestedAmount)) {
          alert('Invalid Input');
        } else {
          // console.log(result);
          const payload: LRequest = {
            requested_amount: String(result.requestedAmount)
          };
          this.loanRequestService.requestForLoan(payload).subscribe(innerResponse => {
            if (! this.checkError(innerResponse[0])) {
              alert('Successfully made loan request');
              this.setDataSource();
            }
          });
        }
      });
    });
  }

  redirectsToLoanPay() {            // work with it
    this.dialog.open(DialogPayLoanComponent, {
      data: {
        message: 'Pay Loan Back',
        loanToPay: this.latestLoanAmount,
        actualLoan: this.actualLoan,
        alreadyPaid: this.latestAlreadyPaid,
        year: this.latestYear,
        month: this.latestMonth,
        monthCount: this.latestMonthCount,
      }
    }).afterClosed().subscribe(result => {
        console.log(result);
        if (result.loanToPay === -1) {
          // do nothing
        } else if (result.paidAmount <= 0 || result.paidAmount > result.loanToPay) {
          alert('Paid Amount is not in range');
        } else if (isNaN(result.paidAmount)) {
          alert('Invalid Input');
        } else {
          // console.log(result);
          const payload: LPay = {
            paid_amount: String(result.paidAmount),
          };
          this.loanHistoryService.createLoanHistory(payload).subscribe(innerResponse => {
            if (! this.checkError(innerResponse[0])) {
              alert('Successfully Paid loan');
              this.setDataSource();
            }
          });
        }
    });
  }

  getNumFromMonthList(month: string) {
    const allMonths = [
      'Dummy', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return allMonths.indexOf(month);
  }

  ordinal_suffix_of(i: number) {
    let j = i % 10;
    let k = i % 100;

    if (j === 1 && k !== 11) {
        return i + 'st';
    }
    if (j === 2 && k !== 12) {
        return i + 'nd';
    }
    if (j === 3 && k !== 13) {
        return i + 'rd';
    }
    return i + 'th';
  }

  applyFilter(filterValue: string) {
    this.loanHistories.filter = filterValue.trim().toLowerCase();
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
