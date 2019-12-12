import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanRequestService } from './../all_services/loan-request.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../shared/custom.validators';

@Component({
  selector: 'app-apply-loan-request',
  templateUrl: './apply-loan-request.component.html',
  styleUrls: ['./apply-loan-request.component.scss']
})
export class ApplyLoanRequestComponent implements OnInit {

  myConsiderableAmounts: any;
  loanRequestForm: FormGroup;

  constructor(
    private loanRequestService: LoanRequestService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loanRequestService.getActualPF_OnLoan_AvailablePF().subscribe(response => {
      this.myConsiderableAmounts = response[0].description;
      // console.log(this.myConsiderableAmounts);
    });
  }

  buildForm() {
    this.loanRequestForm = this.formBuilder.group({
        // name: ['', [
        //     Validators.required,
        //     Validators.minLength(3),
        //     Validators.maxLength(25),
        //     CustomValidators.containsOnlyAlphabet,
        //   ],
        // ],
      requested_amount: ['', [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.min(0),
        ],
      ],
    });
  }

  get requested_amount() {
    return this.loanRequestForm.get('requested_amount');
  }

}
