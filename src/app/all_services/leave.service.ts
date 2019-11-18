import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { apiRoutes } from '../config/apiRoutes';
import { first } from 'rxjs/operators';
import { CreateLeave, ApproveLeave } from '../config/interfaces/leave.interface';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getLeaves(): Observable <any> {
    const httpOptions = this.authService.getAuthorizedHeader();

    return new Observable(observer => {
      this.http.get(apiRoutes.leaves, httpOptions)
      .pipe(first())
      .subscribe(response => {
        observer.next(response);
      }, err => {
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
  }

  submitLeaveApplication(leaveApplication: CreateLeave): Observable <any> {
    const httpOptions = this.authService.getAuthorizedHeader();

    return new Observable(observer => {
      this.http.post(apiRoutes.leave, leaveApplication, httpOptions)
      .pipe(first())
      .subscribe(response => {
        observer.next(response);
      }, err => {
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
  }

  approveLeave(id: number, data: ApproveLeave): Observable <any> {
    const httpOptions = this.authService.getAuthorizedHeader();

    return new Observable(observer => {
      this.http.post(`${apiRoutes.leaveApprove}/${id}`, data, httpOptions)
      .pipe(first())
      .subscribe(response => {
        observer.next(response);
      }, err => {
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
  }

  cancelLeave(id: number): Observable <any> {
    const httpOptions = this.authService.getAuthorizedHeader();

    return new Observable(observer => {
      this.http.get(`${apiRoutes.leaveCancel}/${id}`, httpOptions)
      .pipe(first())
      .subscribe(response => {
        observer.next(response);
      }, err => {
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
  }
}
