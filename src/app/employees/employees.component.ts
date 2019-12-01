import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { UserService } from '../all_services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['serial_no', 'name', 'department', 'designation', 'casual_leave', 'sick_leave'];
  employees = new MatTableDataSource<any>();
  searchKey: string;

  @ViewChild(MatSort, {static: true}  ) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}


  ngOnInit() {
    this.setDataSource();
  }

  openWithdrawRequestWindow() {
		this.openWithdrawRequestModal();
	}

	openWithdrawRequestModal(width?: string) {
		// const dialogRef = this.dialog.open(WithdrawRequestComponent, {
		// 	minWidth: '450px',
		// 	width: width ? width : '55vw'
			
		// });

		// dialogRef.afterClosed().subscribe(res=>{
			
		// 	this.setDataSource();
		// })
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
          casual_leave: i.casual_leave,
          sick_leave: i.sick_leave,
        });
        count = count + 1;
      }
      this.employees.data = responseData;
			this.employees.sort = this.sort;
      this.employees.paginator = this.paginator;
      // console.log(this.employees.data[1].name);
    });
  }
  
	applyFilter(filterValue: string) {
		this.employees.filter = filterValue.trim().toLowerCase();
	}
}