import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CustomValidators } from 'src/app/shared/custom.validators';

@Component({
  selector: 'app-dialog-pay-loan',
  templateUrl: './dialog-pay-loan.component.html',
  styleUrls: ['./dialog-pay-loan.component.scss']
})
export class DialogPayLoanComponent implements OnInit {

  loanPayForm: FormGroup;
  loanToPay: any;
  actualLoan: any;
  alreadyPaid: any;
  year: any;
  month: any;
  monthCount: any;
  rate = 0.01;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.loanToPay = this.data.loanToPay;
    this.actualLoan = this.data.actualLoan;
    this.alreadyPaid = this.data.alreadyPaid;
    this.year = +this.data.year;
    this.month = this.data.month;
    this.monthCount = this.data.monthCount;
    this.setLoanToPayForThisMonth();
  }

  compareTwoAmounts() {
    const diff = (+this.paid_amount.value) - this.loanToPay;
    if (diff > 0) {
      return false;
    } else {
      return true;
    }
  }

  returnData(flag: any) {
    flag = +flag;
    if (flag === 0) {
      return {loanToPay: -1};
    } else {
      return {
        loanToPay: this.loanToPay,
        paidAmount: (flag === 1) ? +this.paid_amount.value : 0,
      };
    }
  }

  setLoanToPayForThisMonth() {
    const now = new Date();
    const yearToday = now.getFullYear();
    const monthToday = now.getMonth() + 1;
    const monthDiff = (yearToday - this.year) * 12 + (monthToday - this.month) + this.monthCount;
    // console.log(monthDiff);
    this.loanToPay = this.actualLoan + this.actualLoan * this.rate * monthDiff - this.alreadyPaid;
  }

  buildForm() {
    this.loanPayForm = this.formBuilder.group({
      paid_amount: [0, [
          CustomValidators.containsDecimalNumber
        ],
      ],
    });
  }

  get paid_amount() {
    return this.loanPayForm.get('paid_amount');
  }

}
