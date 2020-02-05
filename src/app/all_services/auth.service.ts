import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { apiRoutes } from '../config/apiRoutes';
import { Login, Register, Update, ForgotPassword, VerifyCode, SetNewPassword } from '../config/interfaces/user.interface';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

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

  login(credentials: Login) {
    return this.postInHTTP(apiRoutes.login, credentials);
  }

  register(credentials: Register) {
    return this.postInHTTP(apiRoutes.register, credentials);
  }

  update(credentials: Update) {
    return this.postInHTTP(apiRoutes.update, credentials);
  }

  sendVerificationCode(data: ForgotPassword) {
    return this.postInHTTP(apiRoutes.forgotPassword, data);
  }

  verifyVerificationCode(data: VerifyCode) {
    return this.postInHTTP(apiRoutes.verifyVerificationCode, data);
  }

  setNewPassword(data: SetNewPassword) {
    return this.postInHTTP(apiRoutes.setNewPassword, data);
  }

  isLoggedIn() {
    return (this.getValueFromLocalStorage('token')) ? true : false;
  }

  getCurrentRole() {
    return this.getValueFromLocalStorage('role');
  }

  logout(call_back) {
    this.getFromHTTP(apiRoutes.logout).subscribe(response => {
      this.clearLocalStorage();
      call_back();
    }, err => {
      this.clearLocalStorage();
      call_back();
    });
  }

  setValueInLocalStorage(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  getValueFromLocalStorage(key: any) {
    return localStorage.getItem(key);
  }

  // getMyUserId() {
  //   return this.getValueFromLocalStorage('id');
  // }

  deleteFromLocalStorage(key: any) {
    localStorage.removeItem(key);
  }

  private clearLocalStorage() {
    localStorage.clear();
  }

  shouldBeUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable(observer => {
      this.getFromHTTP(apiRoutes.checkUniqueMail).subscribe(response => {
        if (response[0].exists === 'yes') {
          observer.next({shouldBeUnique: true});
        } else {
          observer.next(null);
        }
      });
    });
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

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
}
