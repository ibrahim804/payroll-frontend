import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../all_services/leave.service';
import { CreateLeave } from '../config/interfaces/leave.interface';
import { LeaveCategoryService } from '../all_services/leave-category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogLeaveConfirmationComponent } from '../dialogs/dialog-leave-confirmation/dialog-leave-confirmation.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  leaveCategories: any;
  leaveApplicationForm: FormGroup;
  errMessage: any;

  constructor(
    private leaveService: LeaveService,
    private leaveCategoryService: LeaveCategoryService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.leaveCategoryService.getLeaveCategories().subscribe(res => {
      this.leaveCategories = res[0].leave_categories;
    });
    this.buildForm();
  }

  applyForLeave() {
    const leaveApplication: CreateLeave = {
      leave_category_id: this.leaveApplicationForm.value.leaveCategoryId,
      leave_description: this.leaveApplicationForm.value.description,
      start_date: this.convertDatePickerToString(this.leaveApplicationForm.value.startDate),
      end_date: this.convertDatePickerToString(this.leaveApplicationForm.value.endDate),
    };

    this.dialog.open(DialogLeaveConfirmationComponent, {
      data: {
        message: 'Request For Leave',
      }
    }).afterClosed().subscribe(digResponse => {
        if (digResponse.toString() === '1') {
          this.leaveService.submitLeaveApplication(leaveApplication).subscribe(response => {
            if (! this.checkError(response[0])) {
              alert('Leave application submitted succesfully');
            }
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

  validateTwoDates() {
    let start: any = this.convertDatePickerToString(this.startDate.value);
    start = new Date(start).getTime();
    let end: any = this.convertDatePickerToString(this.endDate.value);
    end = new Date(end).getTime();
    const now = new Date().getTime();
    const tolerance = 86400 * 1000;

    if (start > 0 && end > 0 && start > end) {
      this.errMessage = 'Start date can\'t be greater than the End date.';
      return false;
    } else if (start > 0 && end > 0 && ((now - start) >= tolerance || (now - end) >= tolerance)) {
      this.errMessage = 'Start date or End date can\'t be smaler than today.';
      return false;
    } else {
      this.errMessage = null;
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

  buildForm() {
    this.leaveApplicationForm = this.formBuilder.group({
      leaveCategoryId: ['', [
          Validators.required,
        ],
      ],

      startDate: ['', [
          Validators.required,
        ],
      ],

      endDate: ['', [
          Validators.required,
        ],
      ],

      description: ['', [
          Validators.required,
        ],
      ],
    });
  }

  get leaveCategoryId() {
    return this.leaveApplicationForm.get('leaveCategoryId');
  }

  get startDate() {
    return this.leaveApplicationForm.get('startDate');
  }

  get endDate() {
    return this.leaveApplicationForm.get('endDate');
  }

  get description() {
    return this.leaveApplicationForm.get('description');
  }

  checkOverAllBeforeLogin(credentials: any) {
    // console.log(credentials);
    this.leaveApplicationForm.setErrors({
      invalidLogin: true
    });
  }

}

/*
credentials.leaveCategoryId.length === 0 ||
credentials.description.length === 0 ||
!this.convertDatePickerToString(credentials.startDate) ||
!this.convertDatePickerToString(credentials.endDate)
*/
