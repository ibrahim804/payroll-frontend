import { SalaryService } from './../all_services/salary.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SingleObj } from '../config/interfaces/salary.interface';

@Component({
  selector: 'app-dialog-salary-details',
  templateUrl: './dialog-salary-details.component.html',
  styleUrls: ['./dialog-salary-details.component.scss']
})
export class DialogSalaryDetailsComponent implements OnInit {

  employeeSalary: SingleObj;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private salaryService: SalaryService) {}

  ngOnInit() {
    this.salaryService.getSalary(this.data.id).subscribe(response => {
      if (response[0].status === 'OK') {
        this.employeeSalary = response[0].salary;
        this.employeeSalary.gross_salary = response[0].gross_salary;
        this.employeeSalary.total_deduction = response[0].total_deduction;
        this.employeeSalary.net_salary = response[0].net_salary;
        this.assignDefaultValue();
      } else {
        this.employeeSalary = null;
      }
    });
  }

  private assignDefaultValue() {
    if (! this.employeeSalary.basic_salary) { this.employeeSalary.basic_salary = '0'; }
    if (! this.employeeSalary.house_rent_allowance) { this.employeeSalary.house_rent_allowance = '0'; }
    if (! this.employeeSalary.medical_allowance) { this.employeeSalary.medical_allowance = '0'; }
    if (! this.employeeSalary.special_allowance) { this.employeeSalary.special_allowance = '0'; }
    if (! this.employeeSalary.fuel_allowance) { this.employeeSalary.fuel_allowance = '0'; }
    if (! this.employeeSalary.phone_bill_allowance) { this.employeeSalary.phone_bill_allowance = '0'; }
    if (! this.employeeSalary.other_allowance) { this.employeeSalary.other_allowance = '0'; }
    if (! this.employeeSalary.tax_deduction) { this.employeeSalary.tax_deduction = '0'; }
    if (! this.employeeSalary.provident_fund) { this.employeeSalary.provident_fund = '0'; }
    if (! this.employeeSalary.other_deduction) { this.employeeSalary.other_deduction = '0'; }
  }
}
