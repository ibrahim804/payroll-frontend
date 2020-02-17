import { DepartmentService } from './../all_services/department.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { urlRoutes } from '../config/apiRoutes';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements AfterViewInit, OnInit {

  displayedColumns = [ 'serial_no', 'name', 'update'];
  departments = new MatTableDataSource<any>();
  searchKey: string;
  departmentIds = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    let responseData = [];
    let count = 1;
    this.departmentService.getAllDepartments().subscribe(response => {
      for (let i of response[0].departments) {
        responseData.push({
          serial_no: count,
          name: i.department_name,
        });
        count = count + 1;
        this.departmentIds.push(i.id);
      }
      this.departments.data = responseData;
      this.departments.sort = this.sort;
      this.departments.paginator = this.paginator;
      // console.log(this.departmentIds);
    });
  }

  redirectsToAddDepartment() {
    this.router.navigate([urlRoutes.departmentsAdd]);
  }

  applyFilter(filterValue: string) {
    this.departments.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {}
}
