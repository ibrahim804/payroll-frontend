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
  providentFund: any;
  onLoan: any;
  availablePF: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.providentFund = this.data.responses.provident_fund;
    this.onLoan = this.data.responses.on_loan;
    this.availablePF = this.data.responses.available_pf;
  }

  compareTwoAmounts() {
    const diff = (+this.requested_amount.value) - this.availablePF;
    if (diff > 0) {
      return false;
    } else {
      return true;
    }
  }

  returnData(flag: any) {
    flag = +flag;
    if (flag === 0) {
      return {availablePF: -1};
    } else {
      return {
        availablePF: this.availablePF,
        requestedAmount: (flag === 1) ? +this.requested_amount.value : 0,
      };
    }
  }

  buildForm() {
    this.loanRequestForm = this.formBuilder.group({
      requested_amount: [0, [
          CustomValidators.containsDecimalNumber
        ],
      ],
    });
  }

  get requested_amount() {
    return this.loanRequestForm.get('requested_amount');
  }

}
