import { Router } from '@angular/router';
import { Create } from './../config/interfaces/working-day.interface';
import { Register } from './../config/interfaces/user.interface';
// import { UserService } from './../all_services/user.service';
import { AuthService } from './../all_services/auth.service';
import { urlRoutes } from './../config/apiRoutes';
import { DepartmentService } from '../all_services/department.service';
import { DesignationService } from '../all_services/designation.service';
// import { FileUploader } from 'ng2-file-upload';
// import { DataService } from '../_services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { WorkingDayService } from '../all_services/working-day.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  // public uploader: FileUploader;
  // public hasBaseDropZoneOver = false;
  // public hasAnotherDropZoneOver = false;

  public departments;
  private departmentIdAttrbute;
  public designations;
  formErrMessage: any;

  // AMAR

  weekDays = [
    { id: 100, name: 'Sunday', value: 'sunday' },
    { id: 200, name: 'Monday', value: 'monday' },
    { id: 300, name: 'Tuesday', value: 'tuesday' },
    { id: 400, name: 'Wednesday', value: 'wednesday' },
    { id: 500, name: 'Thursday', value: 'thursday' },
    { id: 600, name: 'Friday', value: 'friday' },
    { id: 700, name: 'Saturday', value: 'saturday' },
  ];

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    // private userService: UserService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    // private data: DataService,
    private workingDaysService: WorkingDayService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.uploader = new FileUploader({
    //   url: apiRoutes.fileUploadCreateUser,
    //   isHTML5: true,
    //   method: 'POST',
    //   authTokenHeader:  'authorization',
    //   authToken: 'Bearer ' + this.authService.getValueFromLocalStorage('token'),
    //   itemAlias: 'file'
    // });

    this.formErrMessage = null;
    this.getDepartments();

    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    // amar
    this.buildForm();
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

  registerEmployee() {
    if (! this.checkOverAllBeforeLogin()) {
      return;
    }
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
    };

    this.authService.register(data).subscribe(response => {
      // console.log(response);
      if (! this.checkError(response[0])) {
        alert('Employee created succesfully');
        this.getProcessedWorkingDayId(response[0].id);
        // const workingDayId = this.getProcessedWorkingDayId(response[0].id);
        // console.log('working days id is: ', workingDayId);
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

  getProcessedWorkingDayId(userId: string) {
    // console.log('user id is: ' + userId, this.registerForm.value.workingDays);

    let shouldBeCreated = false;

    for (let i = 0; i < this.registerForm.value.workingDays.length; i++) {
      if (this.registerForm.value.workingDays[i] == true) {
        shouldBeCreated = true;
        break;
      }
    }

    if (! shouldBeCreated) {
      console.log(-1);
    }

    const data: Create = {
      sunday: String(this.registerForm.value.workingDays[0]),
      monday: String(this.registerForm.value.workingDays[1]),
      tuesday: String(this.registerForm.value.workingDays[2]),
      wednesday: String(this.registerForm.value.workingDays[3]),
      thursday: String(this.registerForm.value.workingDays[4]),
      friday: String(this.registerForm.value.workingDays[5]),
      saturday: String(this.registerForm.value.workingDays[6]),
      user_or_company: 'user',
      user_id: String(userId),
    };

    // console.log('Final working day paylod is : ', data);

    this.workingDaysService.createWorkingDay(data).subscribe(response => {
      if (! this.checkError(response[0])) {
        // console.log(response[0].working_day_id);
        this.router.navigate([urlRoutes.employeesList]);
      }
    });
  }

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  // public fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }

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

      departmentId: ['', [
        Validators.required,
        ],
      ],

      designationId: ['', [
        Validators.required,
        ],
      ],

      joiningDate: ['', [
          Validators.required,
        ],
      ],

      workingDays: new FormArray([]),

    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.weekDays.forEach((o, i) => {
      const control = new FormControl(false);
      (this.registerForm.controls.workingDays as FormArray).push(control);
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

  checkOverAllBeforeLogin() {
    this.formErrMessage = null;
    if (
      this.name.value.length === 0 ||
      this.gender.value === null || this.gender.value.length === 0 ||
      this.email.value.length === 0 ||
      this.phone.value.length === 0 ||
      this.password.value.length === 0 ||
      this.joiningDate.value === null || this.joiningDate.value.length === 0 ||
      this.departmentId.value.length === 0 ||
      this.designationId.value.length === 0
    ) {
      this.formErrMessage = 'All required fields must be filled out';
      return false;
    } else {
      this.formErrMessage = null;
      return true;
    }
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

}
