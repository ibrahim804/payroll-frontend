import { Component, OnInit } from '@angular/core';
import { Salary } from '../_models/salary';
import { SalaryService } from '../_services/salary.service';
import { DepartmentService } from '../_services/department.service';

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.css']
})
export class SalaryManagementComponent implements OnInit {

  public departments;
  public designations;
  public employees;

  private department_id;
  private designation_id;
  private employee_id;
  private salary;

  private salaryStatus;
  private salaryMessage;
  private existing;

  constructor(private salaryService: SalaryService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments(){
    this.departmentService.getDepartment().subscribe(data => {
      this.departments = data[0].departments;
    });
  }

  getDesignations(){
    this.department_id = (<HTMLInputElement>document.getElementById("select_department")).value;
    this.departmentService.getDesignation(this.department_id).subscribe(data => {
      this.designations = data[0].designations;
    });
  }

  getEmployees(){
    this.department_id = (<HTMLInputElement>document.getElementById("select_department")).value;
    this.designation_id = (<HTMLInputElement>document.getElementById("select_designation")).value;

    this.departmentService.getEmployee(this.department_id, this.designation_id).subscribe(data => {
      this.employees = data[0].users;
    });
  }

  getSalaryInfo(){
    this.employee_id = (<HTMLInputElement>document.getElementById("select_employee")).value;
    this.salaryService.getSalaryInfo(this.employee_id).subscribe(data => {
      if (data[0].status == "FAILED"){
        console.log(data[0].message);
        this.salaryStatus = data[0].status;
        this.salaryMessage = data[0].message;
        this.existing = false;
      }
      else{
        this.salaryStatus = data[0].status;
        this.existing = true;
        console.log(data);
        this.salary = data[0];
        console.log(this.salary);
      }
    });
  }

  showSalary(){    
    if(this.salaryStatus === "FAILED"){
      (<HTMLInputElement>document.getElementById("basic")).value = null;

      (<HTMLInputElement>document.getElementById("house_rent_allowance")).value = null;
      (<HTMLInputElement>document.getElementById("medical_allowance")).value = null;
      (<HTMLInputElement>document.getElementById("special_allowance")).value = null;
      (<HTMLInputElement>document.getElementById("phone_bill_allowance")).value = null;
      (<HTMLInputElement>document.getElementById("fuel_allowance")).value = null;
      (<HTMLInputElement>document.getElementById("other_allowance")).value = null;

      (<HTMLInputElement>document.getElementById("provident_fund")).value = null;
      (<HTMLInputElement>document.getElementById("tax_deduction")).value = null;
      (<HTMLInputElement>document.getElementById("other_deduction")).value = null;
      
      (<HTMLInputElement>document.getElementById("gross_salary")).value = null;
      (<HTMLInputElement>document.getElementById("total_deduction")).value = null;
      (<HTMLInputElement>document.getElementById("net_salary")).value = null;
    }

    if(this.salaryStatus !== "FAILED"){
      (<HTMLInputElement>document.getElementById("basic")).value = this.salary.salary.basic_salary;

      (<HTMLInputElement>document.getElementById("house_rent_allowance")).value = this.salary.salary.house_rent_allowance;
      (<HTMLInputElement>document.getElementById("medical_allowance")).value = this.salary.salary.medical_allowance;
      (<HTMLInputElement>document.getElementById("special_allowance")).value = this.salary.salary.special_allowance;
      (<HTMLInputElement>document.getElementById("phone_bill_allowance")).value = this.salary.salary.phone_bill_allowance;
      (<HTMLInputElement>document.getElementById("fuel_allowance")).value = this.salary.salary.fuel_allowance;
      (<HTMLInputElement>document.getElementById("other_allowance")).value = this.salary.salary.other_allowance;

      (<HTMLInputElement>document.getElementById("provident_fund")).value = this.salary.salary.provident_fund;
      (<HTMLInputElement>document.getElementById("tax_deduction")).value = this.salary.salary.tax_deduction;
      (<HTMLInputElement>document.getElementById("other_deduction")).value = this.salary.salary.other_deduction;
      
      (<HTMLInputElement>document.getElementById("gross_salary")).value = this.salary.gross_salary;
      (<HTMLInputElement>document.getElementById("total_deduction")).value = this.salary.total_deduction;
      (<HTMLInputElement>document.getElementById("net_salary")).value = this.salary.net_salary;
    }
  }

  updateSalary(){
    let salary = new Salary;

    salary.user_id = (<HTMLInputElement>document.getElementById("select_employee")).value;

    salary.basic_salary = (<HTMLInputElement>document.getElementById("basic")).value;
    salary.house_rent_allowance = (<HTMLInputElement>document.getElementById("house_rent_allowance")).value;
    salary.medical_allowance = (<HTMLInputElement>document.getElementById("medical_allowance")).value;
    salary.special_allowance = (<HTMLInputElement>document.getElementById("special_allowance")).value;
    salary.phone_bill_allowance = (<HTMLInputElement>document.getElementById("phone_bill_allowance")).value;
    salary.fuel_allowance = (<HTMLInputElement>document.getElementById("fuel_allowance")).value;
    salary.other_allowance = (<HTMLInputElement>document.getElementById("other_allowance")).value;

    salary.provident_fund = (<HTMLInputElement>document.getElementById("provident_fund")).value;
    salary.tax_deduction = (<HTMLInputElement>document.getElementById("tax_deduction")).value;
    salary.other_deduction = (<HTMLInputElement>document.getElementById("other_deduction")).value;

    if(this.existing == false){
      this.salaryService.newSalaryInfo(salary).subscribe(data => {
        console.log(data);
  
        if(data[0].status == "FAILED"){
          console.log(data[0].message);
        }
        
        else{
          (<HTMLInputElement>document.getElementById("gross_salary")).value = data[0].gross_salary;
          (<HTMLInputElement>document.getElementById("total_deduction")).value = data[0].total_deduction;
          (<HTMLInputElement>document.getElementById("net_salary")).value = data[0].net_salary;        
        }
      })
    }

    else if(this.existing == true){
      this.salaryService.updateSalaryInfo(salary, salary.user_id).subscribe(data => {
        console.log(data);
  
        if(data[0].status == "FAILED"){
          console.log(data[0].message);
        }
        
        else{
          (<HTMLInputElement>document.getElementById("gross_salary")).value = data[0].gross_salary;
          (<HTMLInputElement>document.getElementById("total_deduction")).value = data[0].total_deduction;
          (<HTMLInputElement>document.getElementById("net_salary")).value = data[0].net_salary;        
        }
      })
    }
  }
}
