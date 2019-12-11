import { DialogConfirmationComponent } from './../dialogs/dialog-confirmation/dialog-confirmation.component';
import { ProvidentFundService } from './../provident-fund.service';
import { Create as PF } from './../config/interfaces/provident-fund.interface';
import { Create as PAY } from './../config/interfaces/payment.interface';
import { UserService } from './../all_services/user.service';
import { PaymentService } from './../all_services/payment.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewInit, OnInit {

  employees: any;

  displayedColumns = [ 'serial_no', 'name', 'department', 'designation', 'net_salary', 'payment'];
  payments = new MatTableDataSource<any>();
  searchKey: string;
  paymentsIds = [];
  payableIds = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
    private providentFundService: ProvidentFundService,
    private dialog: MatDialog,
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
      this.payableIds = combinedResponse[1][0].payments_user_id;
      for (let i of combinedResponse[0][0].users) {
        responseData.push({
          serial_no: count,
          name: i.full_name,
          department: i.department,
          designation: i.designation,
          net_salary: i.salary,
          isActive: this.payableIds.indexOf(i.id) === -1,
          label: (this.payableIds.indexOf(i.id) === -1) ? 'Make Payment' : 'Already Paid',
          class: (this.payableIds.indexOf(i.id) === -1) ?
            'btn btn-success btn-sm mr-1' : 'btn btn-dark btn-sm mr-1',
        });
        count = count + 1;
        this.paymentsIds.push(i.id);
      }
      this.payments.data = responseData;
      this.payments.sort = this.sort;
      this.payments.paginator = this.paginator;
    });
  }

  redirectsToMakePayment(serialNo: number) {
    const payload: PAY = {
      user_id: String(this.paymentsIds[serialNo - 1]),
      employee_monthly_cost: '-1',
      payable_amount: '-1',
    };
    this.dialog.open(DialogConfirmationComponent, {
      data: {message: 'Make Payment'}
    }).afterClosed().subscribe(result => {
      if (result === '1') {
        this.paymentService.makePayment(payload).subscribe(response => {
          if (! this.checkError(response[0])) {
            this.depositProvidentFund(payload.user_id);
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
        alert('Payment Done. Also, Provident Fund calculated');
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
