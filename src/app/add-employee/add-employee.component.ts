import { Component, OnInit } from '@angular/core';
import { SignupService } from '../_services/signup.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/employee';
import { DepartmentService } from '../_services/department.service';
import { FileUploader } from 'ng2-file-upload';
import { EmployeeService } from '../_services/employee.service';
import { NgbDatepickerService } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-service';
import { DataService } from '../_services/data.service';

const URL = "http://192.168.0.158:8000/api/file-upload";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({
    url: URL,
    isHTML5: true,
    method: 'POST',
    authTokenHeader:  'authorization',
    authToken: 'Bearer '+ localStorage.getItem("token"),
    itemAlias: 'file'
  });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public departments;
  private department_id;
  public designations;

  private employee;

  constructor(private signupService: SignupService, private departmentService: DepartmentService, private employeeService: EmployeeService, private data: DataService) {}

  ngOnInit() {
    this.getDepartments();
    if(this.data.employee_id){
      this.getEmployee(this.data.employee_id);
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }; 
  }

  getEmployee(employee_id){
    this.employeeService.getEmployee(employee_id).subscribe(data => {
      console.log(data[0].description);
      // this.updateEmployee(data[0].description)
      this.viewDataForForm(data[0].description)
    })
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

  viewDataForForm(employee){
    (<HTMLInputElement>document.getElementById("name")).value = employee.full_name;
    (<HTMLInputElement>document.getElementById("date_of_birth")).value = employee.date_of_birth;
    (<HTMLInputElement>document.getElementById("gender")).value = employee.gender;
    (<HTMLInputElement>document.getElementById("marital_status")).value = employee.marital_status;
    (<HTMLInputElement>document.getElementById("fathers_name")).value = employee.fathers_name;
    (<HTMLInputElement>document.getElementById("nationality")).value = employee.nationality;
    (<HTMLInputElement>document.getElementById("passport_number")).value = employee.passport_number;

    (<HTMLInputElement>document.getElementById("email")).value = employee.email;
    (<HTMLInputElement>document.getElementById("phone")).value = employee.phone;
    (<HTMLInputElement>document.getElementById("present_address")).value = employee.present_address;
    (<HTMLInputElement>document.getElementById("permanent_address")).value = employee.permanent_address;
    
    (<HTMLInputElement>document.getElementById("employee_id")).value = employee.employee_id;
    (<HTMLInputElement>document.getElementById("select_department")).value = employee.select_department;
    (<HTMLInputElement>document.getElementById("select_designation")).value = employee.select_designation;
    (<HTMLInputElement>document.getElementById("joining_date")).value = employee.joining_date;
    
    (<HTMLInputElement>document.getElementById("user_name")).value = employee.user_name;
    (<HTMLInputElement>document.getElementById("password")).value = employee.password;
  }

  getDataFromForm(){
    let employee = new Employee;

    employee.full_name = (<HTMLInputElement>document.getElementById("name")).value;
    employee.date_of_birth = (<HTMLInputElement>document.getElementById("date_of_birth")).value;
    employee.gender = (<HTMLInputElement>document.getElementById("gender")).value;
    employee.marital_status = (<HTMLInputElement>document.getElementById("marital_status")).value;
    employee.fathers_name = (<HTMLInputElement>document.getElementById("fathers_name")).value;
    employee.nationality = (<HTMLInputElement>document.getElementById("nationality")).value;
    employee.passport_number = (<HTMLInputElement>document.getElementById("passport_number")).value;

    employee.email = (<HTMLInputElement>document.getElementById("email")).value;
    employee.phone = (<HTMLInputElement>document.getElementById("phone")).value;
    employee.present_address = (<HTMLInputElement>document.getElementById("present_address")).value;
    employee.permanent_address = (<HTMLInputElement>document.getElementById("permanent_address")).value;
    
    employee.employee_id = (<HTMLInputElement>document.getElementById("employee_id")).value;
    employee.department_id = (<HTMLInputElement>document.getElementById("select_department")).value;
    employee.designation_id = (<HTMLInputElement>document.getElementById("select_designation")).value;
    employee.joining_date = (<HTMLInputElement>document.getElementById("joining_date")).value;
    //employee.working_days = (<HTMLInputElement>document.getElementById("working_days")).value;
    
    employee.user_name = (<HTMLInputElement>document.getElementById("user_name")).value;
    employee.password = (<HTMLInputElement>document.getElementById("password")).value;

    return employee;
  }

  updateEmployee(){
    let employee = this.getDataFromForm();

    this.employeeService.updateEmployee(employee, this.data.employee_id).subscribe(data => {
      console.log(data);
    })
  }
  
  addEmployee(){
    let employee = this.getDataFromForm();

    this.signupService.createUser(employee).subscribe(data => {
      console.log(data);

      if(data[0].status == "FAILED"){
        console.log(data[0].message);
      }

      else{
        alert("Registration complete");
      }
    })
  }


  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
