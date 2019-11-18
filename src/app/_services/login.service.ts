import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Employee } from '../_models/employee';
import { apiRoutes } from '../config/apiRoutes';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(employee: Employee): Observable<Employee>{
    return this.http.post(apiRoutes.login, employee, httpOptions).pipe(
      tap((loggedUser: Employee) => console.log(`Login credentials posted successful.`)),
      catchError(this.handleError<Employee>('Login'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
