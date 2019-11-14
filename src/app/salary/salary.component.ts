import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { SalaryDataSource, SalaryItem } from './salary-datasource';
import { SalaryService } from '../_services/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<SalaryItem>;
  dataSource: SalaryDataSource;

  displayedColumns = ['id', 'name', 'department', 'designation', 'salary', 'action'];

  constructor(private salaryService: SalaryService){ }

  ngOnInit() {
    this.salaryService.getAllSalary().subscribe(data =>{
      console.log(data);
      this.dataSource = new SalaryDataSource(data[0].users);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit() {
  }
}
