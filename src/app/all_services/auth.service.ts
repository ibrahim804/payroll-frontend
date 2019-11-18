import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  deleteFromLocalStorage(key: any) {
    localStorage.removeItem(key);
  }
}
