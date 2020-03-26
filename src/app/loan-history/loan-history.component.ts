import { combineLatest } from 'rxjs';
import { Create as LRequest } from './../config/interfaces/loan-request.interface';
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
                        'actual_loan_amount', 'contract_duration', 'current_loan_amount',
                        'paid_this_month', 'total_paid_amount', 'loan_status'
                    ];
  loanHistories = new MatTableDataSource<any>();
  searchKey: string;
  loanHistoryIds = [];

  isActive: boolean;

  // latestLoanAmount: any = null;
  // actualLoan: any = null;
  // latestAlreadyPaid: any = null;
  // latestMonth: any = null;
  // latestYear: any = null;
  // latestMonthCount: any = null;

  // payLoanLabel: string;
  // payLoanDisabled: boolean;

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
    // this.latestLoanAmount = null;
    // this.actualLoan = null;
    // this.latestAlreadyPaid = null;
    // this.latestMonth = null;
    // this.latestYear = null;
    // this.latestMonthCount = null;
    // this.payLoanLabel = 'Pay Loan';
    // this.payLoanDisabled = false;
  }

  setDataSource() {
    this.setDefaultValues();

    this.loanRequestService.checkForPendingRequest().subscribe(pendingResponse => {
      if (pendingResponse[0].status === 'FAILED') {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
      let responseData = [];
      let count = 1;
      this.loanHistoryService.getEmployeesHistory().subscribe(employeeHistoriesResponse => {
        for (let i of employeeHistoriesResponse[0].loan_histories) {
          responseData.push({
            serial_no: count,
            month: i.month,
            year: i.year,
            month_count: this.ordinal_suffix_of(i.month_count + 1),
            contract_duration: i.contract_duration + ' Months',
            actual_loan_amount: i.actual_loan_amount + ' TK',
            current_loan_amount: i.current_loan_amount + ' TK',
            paid_this_month: i.paid_this_month + ' TK',
            total_paid_amount: i.total_paid_amount + ' TK',
            loan_status:
              ((i.loan_status).substring(0, 1)).toUpperCase() + (i.loan_status).substring(1, (i.loan_status).length),
          });

          count = count + 1;
          this.loanHistoryIds.push(i.id);

          // if (this.latestLoanAmount == null) {
          //   this.latestLoanAmount = i.current_loan_amount;
          //   this.actualLoan = i.actual_loan_amount;
          //   this.latestAlreadyPaid = i.total_paid_amount;
          //   this.latestYear = i.year;
          //   this.latestMonth = this.getNumFromMonthList(i.month);
          //   this.latestMonthCount = i.month_count;
          // }
        }
        this.loanHistories.data = responseData;
        this.loanHistories.sort = this.sort;
        this.loanHistories.paginator = this.paginator;
      });
    });
  }

  redirectsToLoanApply() {
    this.loanRequestService.getLoanableAmount().subscribe(response => {
      const myConsiderableAmounts = response[0].gross;
      this.dialog.open(ApplyLoanRequestComponent, {
        data: {
          message: 'Make Your Loan Request',
          responses: myConsiderableAmounts,
        }
      }).afterClosed().subscribe(result => {
        if (result.loanableAmount === -1) {
          // do nothing
        } else if (result.requestedAmount <= 0 || result.requestedAmount > result.loanableAmount) {
          alert('Requested Amount is not in range');
        } else if (isNaN(result.requestedAmount)) {
          alert('Invalid Input');
        } else if (result.contractDuration < 3 || result.contractDuration > 12) {
          alert('Contract Duration must be in between 3 months to 12 months');
        } else if (isNaN(result.contractDuration)) {
          alert('Invalid Input');
        } else {
          const payload: LRequest = {
            requested_amount: String(result.requestedAmount),
            contract_duration: String(result.contractDuration),
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
