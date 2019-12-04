import { Update, Register } from './../config/interfaces/user.interface';
import { UserService } from './../all_services/user.service';
import { AuthService } from './../all_services/auth.service';
import { apiRoutes } from './../config/apiRoutes';
import { DepartmentService } from '../all_services/department.service';
import { DesignationService } from '../all_services/designation.service';
import { FileUploader } from 'ng2-file-upload';
import { DataService } from '../_services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';

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
  private departmentIdAttrbute;
  public designations;

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
    this.departmentIdAttrbute = (document.getElementById('departmentId') as HTMLInputElement).value;
    this.designationService.getDesignationsOfThisDepartment(this.departmentIdAttrbute).subscribe(data => {
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

  registerEmployee() {    // my one
    const full_name = (this.registerForm.value.name.length) ? this.registerForm.value.name : null;
    const date_of_birth = this.convertDatePickerToString(this.registerForm.value.dateOfBirth);
    const gender = (this.registerForm.value.gender.length) ? this.registerForm.value.gender : null;
    const marital_status = (this.registerForm.value.maritalStatus.length) ? this.registerForm.value.maritalStatus : null;
    const fathers_name = (this.registerForm.value.fathersName.length) ? this.registerForm.value.fathersName : null;
    const nationality = (this.registerForm.value.nationality.length) ? this.registerForm.value.nationality : null ;
    const passport_number = (this.registerForm.value.passportNumber.length) ? this.registerForm.value.passportNumber : null;
    const email = (this.registerForm.value.email.length) ? this.registerForm.value.email : null;
    const phone = (this.registerForm.value.phone.length) ? this.registerForm.value.phone : null;
    const present_address = (this.registerForm.value.presentAddress.length) ? this.registerForm.value.presentAddress : null;
    const permanent_address = (this.registerForm.value.permanentAddress.length) ? this.registerForm.value.permanentAddress : null;
    const user_name = (this.registerForm.value.userName.length) ? this.registerForm.value.userName : null;
    const password = (this.registerForm.value.password.length) ? this.registerForm.value.password : null;
    const department_id = (this.registerForm.value.departmentId.length) ? this.registerForm.value.departmentId : null;
    const designation_id = (this.registerForm.value.designationId.length) ? this.registerForm.value.designationId : null;
    const joining_date = this.convertDatePickerToString(this.registerForm.value.joiningDate);

    const data: Register = {
      full_name, gender, email, phone, password, joining_date,
      user_name, department_id, designation_id,
      date_of_birth, marital_status, fathers_name, nationality, passport_number, present_address, permanent_address,
      // work with working days.
    };

    // console.log(data);
    // console.log(this.registerForm);
    this.authService.register(data).subscribe(response => {
      if (! this.checkError(response[0])) {
        console.log('Employee created succesfully');
      }
    });
  }

  convertDatePickerToString(paramDate: any) {
    if (! paramDate) {
      return null;
    }

    let stringDate: string;
    stringDate = `${paramDate.year}-${paramDate.month}-${paramDate.day}` as string;
    return stringDate;
  }

  // addEmployee() {
  //   const employee = this.getDataFromForm();

  //   this.userService.register(employee).subscribe(data => {
  //     console.log(data);

  //     if (data[0].status === 'FAILED') {
  //       console.log(data[0].message);
  //     } else {
  //       alert('Registration complete');
  //     }
  //   });
  // }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  // AMAR

  buildForm() {
    this.registerForm = this.formBuilder.group({

      name: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          CustomValidators.containsOnlyAlphabet,
        ],
      ],

      dateOfBirth: [''],

      gender: ['', [
          Validators.required,
        ],
      ],

      maritalStatus: [''],

      fathersName: ['', [
        Validators.minLength(3),
        Validators.maxLength(25),
        CustomValidators.containsOnlyAlphabet,
      ],
    ],

      nationality: ['Bangladeshi'],

      passportNumber: [''],

      email: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          CustomValidators.cannotContainSpace,
        ], [
          // this.authService.shouldBeUnique,
        ],
      ],

      phone: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          CustomValidators.containsOnlyNumber,
        ],
      ],

      presentAddress: ['', [
          Validators.minLength(10),
          Validators.maxLength(300),
        ],
      ],

      permanentAddress: ['', [
          Validators.minLength(10),
          Validators.maxLength(300),
        ],
      ],

      userName: ['', [
          Validators.minLength(3),
          Validators.maxLength(25),
          CustomValidators.cannotContainSpace,
        ], [
          // this.authService.shouldBeUnique,
        ],
      ],

      password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],

      departmentId: [''],

      designationId: [''],

      joiningDate: ['', [
          Validators.required,
        ],
      ],

      workingDays: [''],

    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get maritalStatus() {
    return this.registerForm.get('maritalStatus');
  }

  get fathersName() {
    return this.registerForm.get('fathersName');
  }

  get nationality() {
    return this.registerForm.get('nationality');
  }

  get passportNumber() {
    return this.registerForm.get('passportNumber');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get presentAddress() {
    return this.registerForm.get('presentAddress');
  }

  get permanentAddress() {
    return this.registerForm.get('permanentAddress');
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get departmentId() {
    return this.registerForm.get('departmentId');
  }

  get designationId() {
    return this.registerForm.get('designationId');
  }

  get joiningDate() {
    return this.registerForm.get('joiningDate');
  }

  get workingDays() {
    return this.registerForm.get('workingDays');
  }

  checkOverAllBeforeLogin(credentials: any) {
    // console.log(credentials);
    this.registerForm.setErrors({
      invalidLogin: true
    });
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

}
