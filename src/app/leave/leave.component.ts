/*
  USER SIDE
*/

import { combineLatest } from 'rxjs';
import { LeaveCountService } from './../all_services/leave-count.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LeaveService } from '../all_services/leave.service';
import { CreateLeave } from '../config/interfaces/leave.interface';
import { LeaveCategoryService } from '../all_services/leave-category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DialogConfirmationComponent } from '../dialogs/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements AfterViewInit, OnInit {

  leaveApplicationForm: FormGroup;

  leaveCategories: any;
  errMessage: any;
  formErrorMessage: any;
  isDefaultView = true;
  isCreate: boolean;
  leaveCounts: any;
  leaveLeft: number;

  displayedColumns = ['serial_no', 'leave_type' , 'start_date', 'end_date', 'description',
                      'requested_duration', 'leave_available', 'status', 'update'];
  leaves = new MatTableDataSource<any>();
  searchKey: string;
  leavesIds = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private leaveService: LeaveService,
    private leaveCategoryService: LeaveCategoryService,
    private leaveCountService: LeaveCountService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.setDefault();
    this.setDataSource();
  }

  setDefault() {
    this.leaveCategories = null;
    this.errMessage = null;
    this.formErrorMessage = null;
    this.isDefaultView = true;
    this.isCreate = false;
    this.leaveCounts = null;
    this.leaveLeft = null;
  }

  setDataSource() {
    this.leavesIds = [];
    combineLatest(
      this.leaveCategoryService.getLeaveCategories(),
      this.leaveCountService.getLeaveCountsOfEmployee(),
    ).subscribe(responseForCreatePage => {
      this.leaveCategories = responseForCreatePage[0][0].leave_categories;
      this.leaveCounts = responseForCreatePage[1][0].leave_counts;  // leave counts of all category of an employee. Chill!!
      // so far, create page. From here, lower part for main page
      let responseData = [];
      let count = 1;
      this.leaveService.getAllLeavesOfAnEmployee().subscribe(responseForMainPage => {
        for (let i of responseForMainPage[0].leaves) {
          responseData.push({
            serial_no: count,
            leave_type: i.leave_type,
            start_date: i.start_date,
            end_date: i.end_date,
            description: i.leave_description,
            requested_duration: i.requested_duration,
            leave_available: i.leave_available,
            status: i.approval_status,
          });
          count = count + 1;
          this.leavesIds.push(i.id);
        }
        this.leaves.data = responseData;
        this.leaves.sort = this.sort;
        this.leaves.paginator = this.paginator;
      });
    });
  }

  applyForLeave() {
    if (! this.validateForm()) {
      return;
    }
    const leaveApplication: CreateLeave = {
      leave_category_id: this.leaveApplicationForm.value.leaveCategoryId,
      leave_description: this.leaveApplicationForm.value.description,
      start_date: this.convertDatePickerToString(this.leaveApplicationForm.value.startDate),
      end_date: this.convertDatePickerToString(this.leaveApplicationForm.value.endDate),
    };

    let thisLeave = null;

    for(let i=0;  i<this.leaveCategories.length; i++) {
      if(this.leaveCategories[i].id === +leaveApplication.leave_category_id) {
        thisLeave = this.leaveCategories[i];
        break;
      }
    }

    // thisLeave = this.leaveCategories[+leaveApplication.leave_category_id - 1];
    this.leaveService.getAvailableCountsAndDuration(
      leaveApplication.leave_category_id, leaveApplication.start_date, leaveApplication.end_date
    ).subscribe(durationResponse => {
      this.dialog.open(DialogConfirmationComponent, {
        data: {
          message: 'Request For Leave',
          leaveCategory: thisLeave.leave_type,
          startDate: leaveApplication.start_date,
          endDate: leaveApplication.end_date,
          description: leaveApplication.leave_description,
          availablePaidLeft: durationResponse[0].leave_left,
          requestedDuration: durationResponse[0].duration,
          unpaidLeaveCount: this.calculateUnpaidLeaveCount(
            durationResponse[0].duration, durationResponse[0].leave_left
          ),
        }
      }).afterClosed().subscribe(digResponse => {
          if (digResponse.toString() === '1') {
            this.leaveService.submitLeaveApplication(leaveApplication).subscribe(response => {
              if (! this.checkError(response[0])) {
                alert('Leave application submitted successfully');
                this.alterView('main');
              }
            });
          }
      });
    });
  }

  calculateUnpaidLeaveCount(duration: string, leaveCount: string) {
    let diff = (+duration) - (+leaveCount);
    if (diff < 0) {
      diff = 0;
    }
    return diff;
  }

  showLeaveCountOfThisCategory() {
    this.leaveLeft = null;
    const selectedValue = this.leaveCategoryId.value;
    for (let i of this.leaveCounts) {
      if (i.leave_category_id == selectedValue) {
        this.leaveLeft = i.leave_left;
        break;
      }
    }
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
      this.errMessage = 'Start date or End date can\'t be smaller than today.';
      return false;
    } else {
      this.errMessage = null;
      return true;
    }
  }

  validateForm() {
    if (
      this.leaveCategoryId.value.length === 0 ||
      this.startDate.value === null || this.startDate.value.length === 0 ||
      this.endDate.value === null || this.endDate.value.length === 0 ||
      this.description.value.length === 0
    ) {
      this.formErrorMessage = 'All fields are required*';
      return false;
    } else {
      this.formErrorMessage = null;
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

  alterView(destinationView: string) {
    if (destinationView === 'create') {
      this.errMessage = null;
      this.formErrorMessage = null;
      this.isDefaultView = false;
      this.isCreate = true;
      this.leaveLeft = null;
      this.buildForm();
    } else {
       this.setDataSource();
       this.isDefaultView = true;
       this.isCreate = false;
    }
  }

  openDialog(serialNo: number) {
    const leaveId = this.leavesIds[serialNo - 1];
    this.dialog.open(DialogConfirmationComponent, {
      data: {
        message: 'Leave Cancellation',
      }
    }).afterClosed().subscribe(diaRes => {
      if (diaRes === '0') {
        alert('Ok, Not Cancelled');
      } else {
        this.leaveService.removeLeave(leaveId).subscribe(response => {
          if (! this.checkError(response[0])) {
            alert('Leave Cancelled Successfully');
            this.setDataSource();
          } else {
            this.setDataSource();
          }
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.leaves.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {}
}
