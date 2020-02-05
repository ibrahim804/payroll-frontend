/*
  ADMIN SIDE
*/

import { DialogLeaveDetailsComponent } from './../dialogs/dialog-leave-details/dialog-leave-details.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { LeaveService } from '../all_services/leave.service';
import { DialogConfirmationComponent } from '../dialogs/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {

  displayedColumns = ['serial_no', 'full_name', 'department_name', 'designation',
                      'leave_type' , 'start_date', 'end_date', 'show_details', 'status',
                      'accept', 'decline'];
  leaves = new MatTableDataSource<any>();
  searchKey: string;
  leavesIds = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private leaveService: LeaveService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    let responseData = [];
    let count = 1;
    this.leaveService.getLeaves().subscribe(response => {
      for (let i of response[0].leaves) {
        responseData.push({
          serial_no: count,
          full_name: i.full_name,
          department_name: i.department_name,
          designation: i.designation,
          leave_type: i.leave_type,
          start_date: i.start_date,
          end_date: i.end_date,
          status: i.approval_status,
          leave_description: i.leave_description,
          leave_length: i.leave_length,
          leave_available: i.leave_available,
        });
        count = count + 1;
        this.leavesIds.push(i.id);
      }
      this.leaves.data = responseData;
      this.leaves.sort = this.sort;
      this.leaves.paginator = this.paginator;
      // console.log(this.leaves.data);
    });
  }

  redirectsToDetails(serialNo: number) {
    const obj = this.leaves.data[serialNo - 1];
    this.dialog.open(DialogLeaveDetailsComponent, {
      data: {
        full_name: obj.full_name,
        department_name: obj.department_name,
        designation: obj.designation,
        leave_type: obj.leave_type,
        start_date: obj.start_date,
        end_date: obj.end_date,
        status: obj.status,
        leave_description: obj.leave_description,
        leave_length: obj.leave_length,
        leave_available: obj.leave_available,
      }
    }).afterClosed().subscribe(result => {
        // console.log(result);
    });
  }

  leaveApplication(serialNo: number) {
    this.dialog.open(DialogConfirmationComponent, {
      data: {
        message: 'Leave Acceptance',
      }
    }).afterClosed().subscribe(response => {
      if (response.toString() === '0') {
        alert('Leave Not Accepted');
      } else {
        const leaveId = this.leavesIds[serialNo - 1];
        this.leaveService.approveLeave(leaveId, {decision: response.toString()}).subscribe(data => {
          if (! this.checkError(data[0])) {
            this.setDataSource();
            alert('Leave Accepted');
          }
        });
      }
    });
  }

  cancelLeave(serialNo: number) {
    this.dialog.open(DialogConfirmationComponent, {
      data: {
        message: 'Leave Cancellation',
      }
    }).afterClosed().subscribe(response => {
      if (response.toString() === '0') {
        alert('Leave Not Rejected');
      } else {
        const leaveId = this.leavesIds[serialNo - 1];
        if (this.leaves.data[serialNo - 1].status === 'Accepted') {
          this.leaveService.cancelLeave(leaveId).subscribe(data => {
            if (! this.checkError(data[0])) {
              this.setDataSource();
              alert('Leave Rejected');
              console.log('call from cancel');
            }
          });
        } else if (this.leaves.data[serialNo - 1].status === 'Pending') {
          this.leaveService.approveLeave(leaveId, {decision: '0'}).subscribe(data => {
            if (! this.checkError(data[0])) {
              this.setDataSource();
              alert('Leave Rejected');
              console.log('call from approve');
            }
          });
        }
      }
    });
  }

  private checkError(response: any) {
    if (response.status === 'FAILED') {
      alert(response.message);
      return true;
    }
    return false;
  }

  applyFilter(filterValue: string) {
    this.leaves.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {}
}

////////////////// test ////
