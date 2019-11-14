import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { GeneratePayrollDataSource, GeneratePayrollItem } from './generate-payroll-datasource';

@Component({
  selector: 'app-generate-payroll',
  templateUrl: './generate-payroll.component.html',
  styleUrls: ['./generate-payroll.component.css']
})
export class GeneratePayrollComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<GeneratePayrollItem>;
  dataSource: GeneratePayrollDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'fixedSalary', 'variableSalary', 'overtime','nightAllowence', 'totalSalary' ,'employeeType', 'department', 'action'];

  ngOnInit() {
    this.dataSource = new GeneratePayrollDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
