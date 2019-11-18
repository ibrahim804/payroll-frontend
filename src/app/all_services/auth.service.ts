import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private getToken() {
    return localStorage.getItem('token');
  }

  getAuthorizedHeader() {
    const token = this.getToken();

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
    return (this.getToken()) ? true : false;
  }

  setValueInLocalStorage(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  getValueFromLocalStorage(key: any) {
    return localStorage.getItem(key);
  }

  deleteFromLocalStorage(key: any) {
    localStorage.removeItem(key);
  }
}
