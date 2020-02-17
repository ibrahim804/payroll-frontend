import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatePassword } from 'src/app/config/interfaces/user.interface';

@Component({
  selector: 'app-dialog-password-update',
  templateUrl: './dialog-password-update.component.html',
  styleUrls: ['./dialog-password-update.component.scss']
})
export class DialogPasswordUpdateComponent implements OnInit {

  passwordUpdateForm: FormGroup;
  formErrMessage = null;

  vis_current: boolean = false;
  vis_new: boolean = false;
  vis_confirm: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPasswordUpdateComponent>,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.passwordUpdateForm = this.formBuilder.group({

      current_password: ['', Validators.required],

      new_password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ]
      ],

      confirm_password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ]
      ],
    });
  }

  get current_password() {
    return this.passwordUpdateForm.get('current_password');
  }

  get new_password() {
    return this.passwordUpdateForm.get('new_password');
  }

  get confirm_password() {
    return this.passwordUpdateForm.get('confirm_password');
  }

  validatePasswordMatching() {
    if (this.new_password.touched &&
        this.new_password.valid &&
        this.confirm_password.touched &&
        this.confirm_password.valid &&
        this.new_password.value != this.confirm_password.value
      ) {
        return false;
      } return true;
  }

  returnData(value: string) {
    if (value === 'update') {
      if(this.checkOverAllBeforeRequest()) {
        const inputs: UpdatePassword = {
          current_password: this.current_password.value,
          new_password: this.new_password.value,
          confirm_password: this.confirm_password.value,
        };
        this.dialogRef.close(inputs);
      }
    } else {
      this.dialogRef.close(null);
    }
  }

  private checkOverAllBeforeRequest() {
    this.formErrMessage = null;
    if (
      // this.current_password.value.length === 0 ||
      // this.new_password.value.length === 0 ||
      // this.confirm_password.value.length === 0
      this.passwordUpdateForm.invalid ||
      this.new_password.value != this.confirm_password.value
    ) {
      this.formErrMessage = 'Please fill up carefully';
      return false;
    } else {
      this.formErrMessage = null;
      return true;
    }
  }

}
