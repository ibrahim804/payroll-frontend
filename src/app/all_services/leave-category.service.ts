import { apiRoutes } from './../config/apiRoutes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaveCategoryService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getLeaveCategories(): Observable <any> {
    const httpOptions = this.authService.getAuthorizedHeader();

    return new Observable(observer => {
      this.http.get(apiRoutes.leaveCategories, httpOptions)
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
