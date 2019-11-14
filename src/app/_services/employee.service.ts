import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmployeesItem } from '../employees/employees-datasource';
import { Employee } from '../_models/employee';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private upadate_url: string = "http://192.168.0.158:8000/api/update/"

  constructor(private http: HttpClient) { }

  getEmployee(employee_id): Observable<EmployeesItem>{
    return this.http.get<EmployeesItem>("http://192.168.0.158:8000/api/user/" + employee_id);
  }

  getEmployees(): Observable<EmployeesItem>{
    return this.http.get<EmployeesItem>("http://192.168.0.158:8000/api/users");
  }



  updateEmployee(employee: Employee, id): Observable<Employee>{
    return this.http.post(this.upadate_url + id, employee).pipe(
      tap((newEmployee: Employee) => console.log(`Update Successful.`)),
      catchError(this.handleError<Employee>('Update'))
    );
  }

  deleteEmployee(id){
    return this.http.get("http://192.168.0.158:8000/api/delete/user/" + id);
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
