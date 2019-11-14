import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LeaveApplication } from '../_models/leaveApplication';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private leave_category_url: string = "http://192.168.0.158:8000/api/leave-categories";
  private submit_application_url: string = "http://192.168.0.158:8000/api/leave";
  private leaves_url: string = "http://192.168.0.158:8000/api/leaves";
  private action_url: string = "http://192.168.0.158:8000/api/leave/approve/";
  private cancel_url: string = "http://192.168.0.158:8000/api/leave/cancel/"

  constructor(private http: HttpClient) { }

  getLeaveCategories(){
    return this.http.get(this.leave_category_url);
  }

  submitLeaveApplication(application: LeaveApplication): Observable<LeaveApplication>{
    return this.http.post(this.submit_application_url, application).pipe(
      tap((application: LeaveApplication) => console.log('Application submitted successfully')),
      catchError(this.handleError<LeaveApplication>('Application '))
    )
  }


  getLeaves(){
    return this.http.get(this.leaves_url);
  }

  leaveAction(id, leave: LeaveApplication): Observable<any>{
    return this.http.post(this.action_url+id, leave).pipe(
      tap((action: LeaveApplication) => console.log('Action Taken')),
      catchError(this.handleError<LeaveApplication>('Action '))

    )
  }

  cancelLeave(id){
    return this.http.get(this.cancel_url+id);
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    }
  }

  private log(message: string){
    console.log(message);
  }
}
