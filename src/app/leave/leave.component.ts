import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../all_services/leave.service';
import { CreateLeave } from '../config/interfaces/leave.interface';
import { LeaveCategoryService } from '../all_services/leave-category.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  public leaveCategories;

  constructor(
    private leaveService: LeaveService,
    private leaveCategoryService: LeaveCategoryService
  ) { }

  ngOnInit() {
    this.leaveCategoryService.getLeaveCategories().subscribe(res => {
      this.leaveCategories = res[0].leave_categories;
    });
  }

  applyForLeave() {
    const leaveApplication: CreateLeave = {
      leave_category_id: (document.getElementById('category') as HTMLInputElement).value,
      leave_description: (document.getElementById('description') as HTMLInputElement).value,
      start_date: (document.getElementById('start_date') as HTMLInputElement).value,
      end_date: (document.getElementById('end_date') as HTMLInputElement).value,
    };

    this.leaveService.submitLeaveApplication(leaveApplication).subscribe(response => {
      console.log(response);
      this.checkError(response[0]);
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
