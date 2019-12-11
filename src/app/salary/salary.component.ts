import { urlRoutes } from './../config/apiRoutes';
import { SalaryService } from './../all_services/salary.service';
import { UserService } from './../all_services/user.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogSalaryDetailsComponent } from '../dialog-salary-details/dialog-salary-details.component';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements AfterViewInit, OnInit {

  displayedColumns = [ 'serial_no', 'name', 'department', 'designation', 'net_salary', 'view_salary', 'update'];
  salaries = new MatTableDataSource<any>();
  searchKey: string;
  salariesIds = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private salaryService: SalaryService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

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
        this.salariesIds.push(i.id);
      }
      this.salaries.data = responseData;
      this.salaries.sort = this.sort;
      this.salaries.paginator = this.paginator;
      // console.log(this.salariesIds);
    });
  }

  redirectsToDetails(serialNo: number) {
    this.dialog.open(DialogSalaryDetailsComponent, {
      data: {
        id: this.salariesIds[serialNo - 1],
        name: this.salaries.data[serialNo - 1].name,
        isExpanded: false,
      }
    }).afterClosed().subscribe(result => {
        // console.log(result);
    });
  }

  redirectsToSalaryUpdate(serialNo: number) {
    this.userService.getEmployeeDeptDesgIds(this.salariesIds[serialNo - 1]).subscribe(response => {
      if (response[0].status === 'OK') {
        response = response[0];
        this.router.navigate([urlRoutes.salaryUpdate], {
          queryParams: {
            serial: this.salariesIds[serialNo - 1],
            name: response.full_name,
            deptSerial: response.department_id,
            deptName: response.department_name,
            desgSerial: response.designation_id,
            desgName: response.designation,
          }
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.salaries.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {}
}
