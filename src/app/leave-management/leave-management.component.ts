import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { LeaveManagementDataSource, LeaveManagementItem } from './leave-management-datasource';
import { LeaveService } from '../all_services/leave.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<LeaveManagementItem>;
  dataSource: LeaveManagementDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'department', 'designation', 'category','start_date', 'end_date', 'working_days', 'leave_available', 'status', 'action'];

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.leaveService.getLeaves().subscribe(data => {

      if (! this.checkError(data[0])) {
        this.dataSource = new LeaveManagementDataSource(data[0].leaves);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
       }
    });
  }

  leaveApplication(id: any, action: any) {
    this.leaveService.approveLeave(+id, {decision: action.toString()}).subscribe(data => {
      if (! this.checkError(data[0])) {
        this.load();
      }
    });
  }

  cancelLeave(id: any) {
    this.leaveService.cancelLeave(+id).subscribe(data => {
      if (! this.checkError(data[0])) {
        this.load();
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
}
