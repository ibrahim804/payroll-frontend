import { DialogLeaveDetailsComponent } from './../dialogs/dialog-leave-details/dialog-leave-details.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { LeaveService } from '../all_services/leave.service';
import { DialogLeaveConfirmationComponent } from '../dialogs/dialog-leave-confirmation/dialog-leave-confirmation.component';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {

/*
  response: id, user_id, full_name, department_name, designation,
  leave_type, leave_description, start_date, end_date, leave_length, leave_available, approval_status
*/

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
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
    // this.leaveService.approveLeave(id, {decision: action.toString()}).subscribe(data => {
    //   if (! this.checkError(data[0])) {
    //     this.setDataSource();
    //   }
    // });
    this.dialog.open(DialogLeaveConfirmationComponent, {
      data: {

      }
    }).afterClosed().subscribe(result => {
        // console.log(result);
    });
  }

  cancelLeave(serialNo: number) {
    // this.leaveService.cancelLeave(id).subscribe(data => {
    //   if (! this.checkError(data[0])) {
    //     this.setDataSource();
    //   }
    // });
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
