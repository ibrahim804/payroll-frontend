import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Salary } from '../_models/salary';
import { Observable, of } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { SalaryItem } from '../salary/salary-datasource';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private all_salary_url = "http://192.168.0.158:8000/api/users";
  private new_salary_url = "http://192.168.0.158:8000/api/salary";
  private update_salary_url = "http://192.168.0.158:8000/api/salary/";

  constructor(private http: HttpClient) { }

  getAllSalary(): Observable<SalaryItem>{
    return this.http.get<SalaryItem>(this.all_salary_url);
  }

  getSalaryInfo(employee_id){
    return this.http.get("http://192.168.0.158:8000/api/salary/" + employee_id);
  }

  newSalaryInfo(salary: Salary): Observable<Salary>{
    return this.http.post(this.new_salary_url, salary, httpOptions).pipe(
      tap((newInfo: Salary) => console.log(`Info added successfully`)),
      catchError(this.handleError<Salary>('Update'))
    );
  }

  updateSalaryInfo(salary: Salary, employee_id): Observable<Salary>{
    return this.http.post(this.update_salary_url+employee_id, salary, httpOptions).pipe(
      tap((newInfo: Salary) => console.log(`Info added successfully`)),
      catchError(this.handleError<Salary>('Update'))
    );
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
