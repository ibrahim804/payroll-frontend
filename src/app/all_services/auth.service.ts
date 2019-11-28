import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  getAuthorizedHeader() {
    const token = this.getValueFromLocalStorage('token');

    const httpheader = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });

    const httpOptions = {
      headers: httpheader
    };

    return httpOptions;
  }

  isLoggedIn() {
    return (this.getValueFromLocalStorage('token')) ? true : false;
  }

  setValueInLocalStorage(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  getValueFromLocalStorage(key: any) {
    return localStorage.getItem(key);
  }

  getCurrentRole(){
    return this.getValueFromLocalStorage('role');
  }

  deleteFromLocalStorage(key: any) {
    localStorage.removeItem(key);
  }

  getFromHTTP(endPoint: string): Observable <any> {
    const httpOptions = this.getAuthorizedHeader();

    return new Observable(observer => {
      this.http.get(endPoint, httpOptions)
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

  postInHTTP(endPoint: string, data: any): Observable <any> {
    const httpOptions = this.getAuthorizedHeader();

    return new Observable(observer => {
      this.http.post(endPoint, data, httpOptions)
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
