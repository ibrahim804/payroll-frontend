import { CustomValidators } from './../shared/custom.validators';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-apply-loan-request',
  templateUrl: './apply-loan-request.component.html',
  styleUrls: ['./apply-loan-request.component.scss']
})
export class ApplyLoanRequestComponent implements OnInit {

  loanRequestForm: FormGroup;
  loanableAmount: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.loanableAmount = this.data.responses;
  }

  compareTwoAmounts() {
    const diff = (+this.requested_amount.value) - this.loanableAmount;
    if (diff > 0) {
      return false;
    } else {
      return true;
    }
  }

  returnData(flag: any) {
    flag = +flag;
    if (flag === 0) {
      return {loanableAmount: -1};
    } else {
      return {
        loanableAmount: this.loanableAmount,
        requestedAmount: (flag === 1) ? +this.requested_amount.value : 0,
        contractDuration: (flag === 1) ? +this.contract_duration.value : 0,
      };
    }
  }

  buildForm() {
    this.loanRequestForm = this.formBuilder.group({
      requested_amount: [0, [
          CustomValidators.containsDecimalNumber
        ],
      ],
      contract_duration: [3, [
          CustomValidators.containsOnlyNumber
        ],
      ],
    });
  }

  get requested_amount() {
    return this.loanRequestForm.get('requested_amount');
  }

  get contract_duration() {
    return this.loanRequestForm.get('contract_duration');
  }

}
