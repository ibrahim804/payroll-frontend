import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LoanHistoryService } from '../all_services/loan-history.service';

@Component({
  selector: 'app-loan-pay-back',
  templateUrl: './loan-pay-back.component.html',
  styleUrls: ['./loan-pay-back.component.scss']
})
export class LoanPayBackComponent implements AfterViewInit, OnInit {

  displayedColumns = [
                      'serial_no', 'name', 'department', 'designation',
                      'actual_loan_amount', 'contract_duration', 'total_paid_amount', 'loan_status'
                     ];

  loanHistories = new MatTableDataSource<any>();
  searchKey: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private loanHistoryService: LoanHistoryService) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    this.loanHistoryService.getLatestHistoryOfEach().subscribe(response => {
      if  (! this.checkError(response[0])) {
        const responseData = [];
        let count = 1;

        for (let i of response[0].latest_histories) {
          responseData.push({
            serial_no: count,
            name: i.name,
            department: i.department,
            designation: i.designation,
            actual_loan_amount: i.actual_loan_amount.toFixed(2) + ' TK',
            contract_duration: i.contract_duration + ' Months',
            total_paid_amount: i.total_paid_amount.toFixed(2) + ' TK',
            loan_status:
              ((i.loan_status).substring(0, 1)).toUpperCase() + (i.loan_status).substring(1, (i.loan_status).length),
          });

          count = count + 1;
        }

        this.loanHistories.data = responseData;
        this.loanHistories.sort = this.sort;
        this.loanHistories.paginator = this.paginator;
      }
    });
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
