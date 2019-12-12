import { LoanHistoryService } from './../all_services/loan-history.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ApplyLoanRequestComponent } from '../apply-loan-request/apply-loan-request.component';

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

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private loanHistoryService: LoanHistoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    let responseData = [];
    let count = 1;
    this.loanHistoryService.getEmployeesHistory().subscribe(response => {
      for (let i of response[0].loan_histories) {
        responseData.push({
          serial_no: count,
          month: i.month,
          year: i.year,
          month_count: this.ordinal_suffix_of(i.month_count),
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
      // console.log(this.loanHistoryIds);
      // console.log(this.loanHistories.data);
    });
  }

  redirectsToDetails(serialNo: number) {
    this.dialog.open(ApplyLoanRequestComponent, {
      data: {
        id: this.loanHistoryIds[serialNo - 1],
        name: this.loanHistories.data[serialNo - 1].name,
        // isExpanded: false,
      }
    }).afterClosed().subscribe(result => {
        // console.log(result);
    });
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

  ngAfterViewInit() {}
}
