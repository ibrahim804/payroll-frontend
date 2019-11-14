import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../_services/leave.service';
import { LeaveApplication } from '../_models/leaveApplication';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  public leaveCategories;

  constructor(private leaveService: LeaveService) { }

  ngOnInit() {
    this.leaveService.getLeaveCategories().subscribe(data => {
      this.leaveCategories = data[0].leave_categories;
    })
  }

  applyForLeave(){
    let application = new LeaveApplication;

    application.leave_category_id = (<HTMLInputElement>document.getElementById("category")).value;
    application.start_date = (<HTMLInputElement>document.getElementById("start_date")).value;
    application.end_date = (<HTMLInputElement>document.getElementById("end_date")).value;
    application.leave_description = (<HTMLInputElement>document.getElementById("description")).value;

    this.leaveService.submitLeaveApplication(application).subscribe(data => {
      console.log(data);
    })
  }

}
