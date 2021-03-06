import { combineLatest } from 'rxjs';
import { RoleService } from './../all_services/role.service';
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
import { MatDialog } from '@angular/material';
import { DialogConfirmationComponent } from '../dialogs/dialog-confirmation/dialog-confirmation.component';

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
  public roles;
  public leaders;
  public formErrMessage: any;

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
    private roleService: RoleService,
    // private data: DataService,
    private workingDaysService: WorkingDayService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
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
    this.departments = null;
    this.departmentIdAttrbute = null;
    this.designations = null;
    this.roles = null;
    this.leaders = null;

    this.retrieveInitialList();

    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.buildForm();
  }

  retrieveInitialList() {
    combineLatest(
      this.departmentService.getAllDepartments(),
      this.roleService.getRoles(),
    )
    .subscribe(combinedResponses => {
      this.departments = combinedResponses[0][0].departments;
      this.roles = combinedResponses[1][0].roles;
    });
  }

  getDesignations() {
    this.departmentIdAttrbute = (document.getElementById('departmentId') as HTMLInputElement).value;
    this.designationService.getDesignationsOfThisDepartment(this.departmentIdAttrbute).subscribe(data => {
      this.designations = data[0].designations;
    });
  }

  showLeaders(idOfRole: any) {
    this.leaders = null;

    if (idOfRole != 3) {  // user role id
      return;
    }

    this.roleService.getLeaders().subscribe(response => {
      this.leaders = response[0].leaders;
    });
  }

  registerEmployee() {
    if (! this.checkOverAllBeforeLogin()) {
      return;
    }
    const full_name = this.registerForm.value.name;
    const date_of_birth = this.convertDatePickerToString(this.registerForm.value.dateOfBirth);
    const gender = this.registerForm.value.gender;
    const marital_status = (this.registerForm.value.maritalStatus.length) ? this.registerForm.value.maritalStatus : null;
    const fathers_name = (this.registerForm.value.fathersName.length) ? this.registerForm.value.fathersName : null;
    const nationality = (this.registerForm.value.nationality.length) ? this.registerForm.value.nationality : null ;
    const passport_number = (this.registerForm.value.passportNumber.length) ? this.registerForm.value.passportNumber : null;
    const email = this.registerForm.value.email;
    const phone = this.registerForm.value.phone;
    const present_address = (this.registerForm.value.presentAddress.length) ? this.registerForm.value.presentAddress : null;
    const permanent_address = (this.registerForm.value.permanentAddress.length) ? this.registerForm.value.permanentAddress : null;
    const user_name = (this.registerForm.value.userName.length) ? this.registerForm.value.userName : null;
    const password = this.registerForm.value.password;
    const department_id = this.registerForm.value.departmentId;
    const designation_id = (this.designations.length === 1) ?
                            String(this.designations[0].id) : this.registerForm.value.designationId;
    const role_id = this.registerForm.value.roleId;
    const id_of_leader = (role_id == 3) ? this.registerForm.value.leaderId : '1';
    const joining_date = this.convertDatePickerToString(this.registerForm.value.joiningDate);
    const deposit_pf = (this.registerForm.value.depositPF.length) ? this.registerForm.value.depositPF : null;

    const data: Register = {
      full_name, gender, email, phone, password, joining_date, role_id, id_of_leader, deposit_pf,
      user_name, department_id, designation_id,
      date_of_birth, marital_status, fathers_name, nationality, passport_number, present_address, permanent_address,
    };

    this.dialog.open(DialogConfirmationComponent, {
      data: {message: 'User Registration'}
    }).afterClosed().subscribe(dialogResponse => {
      if ( dialogResponse === '1') {
        this.authService.register(data).subscribe(response => {
      // console.log(response);
          if (response[0].status === 'OK') {
            alert('Employee created Successfully');
            this.getProcessedWorkingDayId(response[0].id);
            // const workingDayId = this.getProcessedWorkingDayId(response[0].id);
            // console.log('working days id is: ', workingDayId);
          } else {
            alert(response[0].message.email[0]);
          }
        }, (err) => {
          alert('Something wrong.');
        });
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

  forceToFillUpWorkingDay() {
    let shouldBeCreated = false;

    for (let i = 0; i < this.registerForm.value.workingDays.length; i++) {
      if (this.registerForm.value.workingDays[i] == true) {
        shouldBeCreated = true;
        break;
      }
    }

    return shouldBeCreated;
  }

  getProcessedWorkingDayId(userId: string) {

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

    this.workingDaysService.createWorkingDay(data).subscribe(response => {
      if (! this.checkError(response[0])) {
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

      roleId: ['', [
        Validators.required,
        ],
      ],

      leaderId: ['', [
        Validators.required,
        ],
      ],

      joiningDate: ['', [
          Validators.required,
        ],
      ],

      workingDays: new FormArray([]),

      depositPF: [''],

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

  get roleId() {
    return this.registerForm.get('roleId');
  }

  get leaderId() {
    return this.registerForm.get('leaderId');
  }

  get joiningDate() {
    return this.registerForm.get('joiningDate');
  }

  get workingDays() {
    return this.registerForm.get('workingDays');
  }

  get depositPF() {
    return this.registerForm.get('depositPF');
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
      this.designationId.value.length === 0 ||
      this.roleId.value.length === 0 ||
      (this.roleId.value == 3 && this.leaderId.value.length === 0) ||
      this.forceToFillUpWorkingDay() == false
    ) {
      this.formErrMessage = 'All required fields must be filled out';
      return false;
    } else {
      this.formErrMessage = null;
      return true;
    }
  }

  goBack() {
    this.router.navigate([urlRoutes.employeesList]);
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

}
