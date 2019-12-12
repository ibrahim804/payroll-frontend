import { Create } from './../config/interfaces/loan-request.interface';
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

  setDataSource() {
    this.loanRequestService.checkForPendingRequest().subscribe(outerResponse => {
      if (outerResponse[0].status === 'FAILED') {
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
            const payload: Create = {
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

  redirectsToLoanPay() {

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
