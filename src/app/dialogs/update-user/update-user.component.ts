import { Update } from './../../config/interfaces/user.interface';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/all_services/auth.service';
import { CustomValidators } from 'src/app/shared/custom.validators';
import { UserService } from 'src/app/all_services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateForm: FormGroup;
  formErrMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef <UpdateUserComponent >
  ) { }

  ngOnInit() {
    this.formErrMessage = null;
    this.buildForm();
  }

  buildForm() {
    this.updateForm = this.formBuilder.group({

      name: ['', [
          Validators.minLength(3),
          Validators.maxLength(25),
          CustomValidators.containsOnlyAlphabet,
        ],
      ],

      dateOfBirth: [''],

      gender: [''],

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
          Validators.minLength(3),
          Validators.maxLength(255),
          CustomValidators.cannotContainSpace,
        ], [
          // this.authService.shouldBeUnique,
        ],
      ],

      phone: ['', [
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

    });

  }

  get name() {
    return this.updateForm.get('name');
  }

  get dateOfBirth() {
    return this.updateForm.get('dateOfBirth');
  }

  get gender() {
    return this.updateForm.get('gender');
  }

  get maritalStatus() {
    return this.updateForm.get('maritalStatus');
  }

  get fathersName() {
    return this.updateForm.get('fathersName');
  }

  get nationality() {
    return this.updateForm.get('nationality');
  }

  get passportNumber() {
    return this.updateForm.get('passportNumber');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get phone() {
    return this.updateForm.get('phone');
  }

  get presentAddress() {
    return this.updateForm.get('presentAddress');
  }

  get permanentAddress() {
    return this.updateForm.get('permanentAddress');
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

  updateEmployee() {
    const full_name = (this.updateForm.value.name.length) ? this.updateForm.value.name : null;
    const date_of_birth = this.convertDatePickerToString(this.updateForm.value.dateOfBirth);
    const gender = (this.updateForm.value.gender.length) ? this.updateForm.value.gender : null;
    const marital_status = (this.updateForm.value.maritalStatus.length) ? this.updateForm.value.maritalStatus : null;
    const fathers_name = (this.updateForm.value.fathersName.length) ? this.updateForm.value.fathersName : null;
    const nationality = (this.updateForm.value.nationality.length) ? this.updateForm.value.nationality : null ;
    const passport_number = (this.updateForm.value.passportNumber.length) ? this.updateForm.value.passportNumber : null;
    const email = (this.updateForm.value.email.length) ? this.updateForm.value.email : null;
    const phone = (this.updateForm.value.phone.length) ? this.updateForm.value.phone : null;
    const present_address = (this.updateForm.value.presentAddress.length) ? this.updateForm.value.presentAddress : null;
    const permanent_address = (this.updateForm.value.permanentAddress.length) ? this.updateForm.value.permanentAddress : null;

    const data: Update = {
      full_name, gender, email, phone,
      date_of_birth, marital_status, fathers_name, nationality, passport_number, present_address, permanent_address,
    };
    this.userService.update(data).subscribe(response => {
      console.log(response[0]);
      if (! this.checkError(response[0])) {
        alert('Employee information updated successfully');
        this.dialogRef.close();
      }
    }, (err) => {
      alert(err.error.errors.email[0]);
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


}
