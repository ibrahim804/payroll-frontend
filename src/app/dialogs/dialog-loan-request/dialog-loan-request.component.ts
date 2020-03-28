import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/custom.validators';

@Component({
  selector: 'app-dialog-loan-request',
  templateUrl: './dialog-loan-request.component.html',
  styleUrls: ['./dialog-loan-request.component.scss']
})
export class DialogLoanRequestComponent implements OnInit {

  loanRequestForm: FormGroup;
  formErrMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogLoanRequestComponent>,
  ) {}

  ngOnInit() {
    this.formErrMessage = null;
    this.buildForm();
  }

  buildForm() {
    this.loanRequestForm = this.formBuilder.group({
      contractDuration: [this.data.contractDuration, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          CustomValidators.containsOnlyNumber,
        ],
      ],
    });
  }

  get contractDuration() {
    return this.loanRequestForm.get('contractDuration');
  }

  returnData(value: number) {
    if (value === -1) {
      this.dialogRef.close({
        approval_status: -1
      });
    } else if (value === 0) {
      this.dialogRef.close({
        approval_status: 0
      });
    } else if (value === 1) {
      if (this.checkBeforeSubmit()) {
        this.dialogRef.close({
          approval_status: 1,
          contract_duration: this.contractDuration.value
        });
      }
    }
  }

  checkBeforeSubmit() {
    this.formErrMessage = null;

    if (
        this.contractDuration.value.length === 0 ||
        this.isNumber(String(this.contractDuration.value)) === false ||
        (this.contractDuration.value < 3 || this.contractDuration.value > 12)
      ) {
        this.formErrMessage = 'Contract must be in between 3 months to 12 months';
    }

    return (this.formErrMessage) ? false : true;
  }

  isNumber(value: string) {
    for (let i = 0; i < value.length; i++) {
      if (value[i] < '0' || value[i] > '9') {
        return false;
      }
    }
    return true;
  }

}
