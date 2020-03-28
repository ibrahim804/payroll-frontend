import { Update } from './../config/interfaces/loan-request.interface';
import { DialogLoanRequestComponent } from './../dialogs/dialog-loan-request/dialog-loan-request.component';
import { LoanRequestService } from '../all_services/loan-request.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss']
})
export class LoanRequestComponent implements AfterViewInit, OnInit {

  displayedColumns = [ 'serial_no', 'name', 'department', 'designation',
                       'application_date', 'available_amount', 'requested_amount', 'contract_duration',
                       'approval_status'
                    ];

  loanRequests = new MatTableDataSource<any>();
  searchKey: string;
  requestsIds = [];
  employeesIds = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private loanRequestService: LoanRequestService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    let responseData = [];
    let count = 1;
    this.loanRequestService.getPendingRequests().subscribe(response => {
      for (let i of response[0].loan_requests) {
        responseData.push({
          serial_no: count,
          name: i.full_name,
          department: i.department,
          designation: i.designation,
          application_date: i.application_date,
          available_amount: i.available_amount + ' Tk',
          requested_amount: i.requested_amount + ' Tk',
          contract_duration: i.contract_duration + ' Months',
        });
        count = count + 1;
        this.requestsIds.push(i.id);
        this.employeesIds.push(i.user_id);
      }
      this.loanRequests.data = responseData;
      this.loanRequests.sort = this.sort;
      this.loanRequests.paginator = this.paginator;
    });
  }

  respondeToRequest(serialNo: number) {
    const splitedDuration = String(this.loanRequests.data[serialNo - 1].contract_duration).split(' ')[0];

    this.dialog.open(DialogLoanRequestComponent, {
      data: {
        name: this.loanRequests.data[serialNo - 1].name,
        availableAmount: this.loanRequests.data[serialNo - 1].available_amount,
        reqAmount: this.loanRequests.data[serialNo - 1].requested_amount,
        contractDuration: splitedDuration,
      }
    }).afterClosed().subscribe(result => {  // can be -1 (later), 0 (reject), 1 (accept)
        if (result.approval_status === -1) {
          alert('Ok, not responded now');
        } else {
          const payload: Update = {
            approval_status: String(result.approval_status),
            contract_duration: (result.approval_status) ? result.contract_duration : splitedDuration
          };
          this.loanRequestService.approveLoanRequest(this.requestsIds[serialNo - 1], payload).subscribe(response => {
            if (! this.checkError(response[0])) {
              if (result.approval_status === 1) {
                alert('Loan Request Accepted');
              } else {
                alert('Loan Request Rejected');
              }
              this.setDataSource();
            } else {
              this.setDataSource();
            }
          });
        }
    });
  }

  applyFilter(filterValue: string) {
    this.loanRequests.filter = filterValue.trim().toLowerCase();
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
