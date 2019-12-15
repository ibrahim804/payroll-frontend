import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { apiRoutes } from '../config/apiRoutes';
import { CreateLeave, ApproveLeave } from '../config/interfaces/leave.interface';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private authService: AuthService) { }

  getLeaves() {
    return this.authService.getFromHTTP(apiRoutes.leaves);
  }

  getAllLeavesOfAnEmployee(userId: string) {
    return this.authService.getFromHTTP(`${apiRoutes.leaves}/${userId}`);
  }

  getAvailableCountsAndDuration(categoryId: string, startDate: string, endDate: string) {
    return this.authService.getFromHTTP(
      `${apiRoutes.leaveAvailableAndDuration}/${categoryId}/${startDate}/${endDate}`
    );
  }

  submitLeaveApplication(leaveApplication: CreateLeave) {
    return this.authService.postInHTTP(apiRoutes.leave, leaveApplication);
  }

  approveLeave(id: string, data: ApproveLeave) {
    return this.authService.postInHTTP(`${apiRoutes.leaveApprove}/${id}`, data);
  }

  cancelLeave(id: string) {
    return this.authService.getFromHTTP(`${apiRoutes.leaveCancel}/${id}`);
  }

  removeLeave(id: string) {
    return this.authService.getFromHTTP(`${apiRoutes.leaveRemove}/${id}`);
  }
}
