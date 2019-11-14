import { AfterViewInit, Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { EmployeesDataSource, EmployeesItem } from './employees-datasource';
import { EmployeeService } from '../_services/employee.service';
import { NavComponent } from '../nav/nav.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<EmployeesItem>;
  dataSource: EmployeesDataSource;
  nav: String;

  displayedColumns = ['id', 'name', 'department', 'designation', 'casual_leave', 'sick_leave','action'];

  constructor(private employeeService: EmployeeService, private data: DataService){}


  ngOnInit() {
    this.load();
  }

  deleteEmployee(employee_id){
    this.employeeService.deleteEmployee(employee_id).subscribe(data => {
      console.log(data);
      console.log("Employee deleted");
      this.load();
    })
  }

  editEmployee(employee_id){
    this.data.changeMessage("add employee");
    this.data.employee_id = employee_id;
  }

  load(){
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource = new EmployeesDataSource(data[0].users);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }
}
