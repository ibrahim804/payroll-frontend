import { Update, Register } from './../config/interfaces/user.interface';
import { UserService } from './../all_services/user.service';
import { AuthService } from './../all_services/auth.service';
import { apiRoutes } from './../config/apiRoutes';
import { Router } from '@angular/router';
import { DepartmentService } from '../all_services/department.service';
import { DesignationService } from './../all_services/designation.service';
import { FileUploader } from 'ng2-file-upload';
import { NgbDatepickerService } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-service';
import { DataService } from '../_services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public departments;
  private departmentId;
  public designations;

  private employee;

  // AMAR

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private data: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.uploader = new FileUploader({
      url: apiRoutes.fileUploadCreateUser,
      isHTML5: true,
      method: 'POST',
      authTokenHeader:  'authorization',
      authToken: 'Bearer ' + this.authService.getValueFromLocalStorage('token'),
      itemAlias: 'file'
    });

    this.getDepartments();

    if (this.data.employee_id) {
      this.getEmployee(this.data.employee_id);
    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    // amar
    this.buildForm();
  }

  getEmployee(employeeId: any) {
    this.userService.getEmployee(employeeId).subscribe(data => {
      console.log(data[0].description);
      // this.updateEmployee(data[0].description)
      this.viewDataForForm(data[0].description);
    });
  }

  getDepartments() {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departments = data[0].departments;
    });
  }

  getDesignations() {
    this.departmentId = (document.getElementById('select_department') as HTMLInputElement).value;
    this.departmentService.getDesignationsOfThisDepartment(this.departmentId).subscribe(data => {
      this.designations = data[0].designations;
    });
  }

  viewDataForForm(employee: Update) {
    (document.getElementById('name') as HTMLInputElement).value = employee.full_name;
    (document.getElementById('date_of_birth') as HTMLInputElement).value = employee.date_of_birth;
    (document.getElementById('gender') as HTMLInputElement).value = employee.gender;
    (document.getElementById('marital_status') as HTMLInputElement).value = employee.marital_status;
    (document.getElementById('fathers_name') as HTMLInputElement).value = employee.fathers_name;
    (document.getElementById('nationality') as HTMLInputElement).value = employee.nationality;
    (document.getElementById('passport_number') as HTMLInputElement).value = employee.passport_number;

    (document.getElementById('email') as HTMLInputElement).value = employee.email;
    (document.getElementById('phone') as HTMLInputElement).value = employee.phone;
    (document.getElementById('present_address') as HTMLInputElement).value = employee.present_address;
    (document.getElementById('permanent_address') as HTMLInputElement).value = employee.permanent_address;

    (document.getElementById('employee_id') as HTMLInputElement).value = employee.employee_id;
    // (document.getElementById('select_department') as HTMLInputElement).value = employee.select_department;
    // (document.getElementById('select_designation') as HTMLInputElement).value = employee.select_designation;
    (document.getElementById('joining_date') as HTMLInputElement).value = employee.joining_date;

    (document.getElementById('user_name') as HTMLInputElement).value = employee.user_name;
    (document.getElementById('password') as HTMLInputElement).value = employee.password;
  }

  getDataFromForm() {
    let employee: Update;

    employee.full_name = (document.getElementById('name') as HTMLInputElement).value;
    employee.date_of_birth = (document.getElementById('date_of_birth') as HTMLInputElement).value;
    employee.gender = (document.getElementById('gender') as HTMLInputElement).value;
    employee.marital_status = (document.getElementById('marital_status') as HTMLInputElement).value;
    employee.fathers_name = (document.getElementById('fathers_name') as HTMLInputElement).value;
    employee.nationality = (document.getElementById('nationality') as HTMLInputElement).value;
    employee.passport_number = (document.getElementById('passport_number') as HTMLInputElement).value;

    employee.email = (document.getElementById('email') as HTMLInputElement).value;
    employee.phone = (document.getElementById('phone') as HTMLInputElement).value;
    employee.present_address = (document.getElementById('present_address') as HTMLInputElement).value;
    employee.permanent_address = (document.getElementById('permanent_address') as HTMLInputElement).value;

    employee.employee_id = (document.getElementById('employee_id') as HTMLInputElement).value;
    employee.department_id = (document.getElementById('select_department') as HTMLInputElement).value;
    employee.designation_id = (document.getElementById('select_designation') as HTMLInputElement).value;
    employee.joining_date = (document.getElementById('joining_date') as HTMLInputElement).value;
    // employee.working_days = (document.getElementById('working_days')).value;

    employee.user_name = (document.getElementById('user_name') as HTMLInputElement).value;
    employee.password = (document.getElementById('password') as HTMLInputElement).value;

    return employee;
  }

  updateEmployee() {
    const employee = this.getDataFromForm();

    this.userService.updateEmployee(employee, this.data.employee_id).subscribe(data => {
      console.log(data);
    });
  }

  addEmployee() {
    // const employee = this.getDataFromForm();

    // this.userService.register(employee).subscribe(data => {
    //   console.log(data);

    //   if (data[0].status === 'FAILED') {
    //     console.log(data[0].message);
    //   } else {
    //     alert('Registration complete');
    //   }
    // });
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  // AMAR 

  buildForm() {
    this.registerForm = this.formBuilder.group({
      full_name: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      
    });
  }

}
