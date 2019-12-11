import { Create } from './../config/interfaces/payment.interface';
import { UserService } from './../all_services/user.service';
import { PaymentService } from './../all_services/payment.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    let responseData = [];
    let count = 1;
    this.userService.getEmployees().subscribe(response => {
      for (let i of response[0].users) {
        responseData.push({
          serial_no: count,
          name: i.full_name,
          department: i.department,
          designation: i.designation,
          net_salary: i.salary
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
    const data: Create = {
      user_id: String(this.paymentsIds[serialNo - 1]),
      employee_monthly_cost: '-1',
      payable_amount: '-1',
    };
    this.paymentService.makePayment(data).subscribe(response => {
      console.log(response[0]);
      if (response[0].status === 'OK') {
        // start provident fund
      }
    });
  }

  applyFilter(filterValue: string) {
    this.payments.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {}

}
