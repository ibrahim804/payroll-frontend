import { apiRoutes } from './../config/apiRoutes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Login } from '../config/interfaces/user.interface';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(credentials: Login): Observable <any> {
    const httpOptions = this.authService.getAuthorizedHeader();

    return new Observable(observer => {
      this.http.post(apiRoutes.login, credentials, httpOptions)
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
