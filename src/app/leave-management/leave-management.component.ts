import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { LeaveManagementDataSource, LeaveManagementItem } from './leave-management-datasource';
import { LeaveService } from '../_services/leave.service';
import { LeaveApplication } from '../_models/leaveApplication';

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

  constructor (private leaveService: LeaveService){}

  ngOnInit() {
    this.load();
  }

  load(){
    this.leaveService.getLeaves().subscribe(data => {
      this.dataSource = new LeaveManagementDataSource(data[0].leaves);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  leaveApplication(id, action){
    let leave = new LeaveApplication;

    leave.decision = action.toString();
    
    this.leaveService.leaveAction(id, leave).subscribe(data => {

      if(data[0].status === "FAILED"){
        alert(data[0].message);
      }

      console.log(data);
      this.load();
    })
  }

  cancelLeave(id){
    this.leaveService.cancelLeave(id).subscribe(data => {
      console.log(data);
      this.load();
    })
  }
}
