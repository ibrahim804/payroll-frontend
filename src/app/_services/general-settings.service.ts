import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../_models/company';
import { Observable, of } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { WorkingDays } from '../_models/workingDays';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {

  private get_company_info_url = "http://192.168.0.158:8000/api/company/3";
  private working_days_url: string = "http://192.168.0.158:8000/api/working-day";
  private company_info_url: string = "http://192.168.0.158:8000/api/company";

  constructor(private http:HttpClient) { }

  getCompanyInfo(){
    return this.http.get(this.get_company_info_url);
  }

  updateWorkingDays(workingDays: WorkingDays): Observable<WorkingDays>{
    return this.http.post(this.working_days_url, workingDays, httpOptions).pipe(
      tap((updatedInfo: WorkingDays) => console.log(`Info updated successfully`)),
      catchError(this.handleError<WorkingDays>('Update'))
    );
  }

  updateCompanyInfo(company: Company): Observable<Company>{
    return this.http.post(this.company_info_url, company, httpOptions).pipe(
      tap((updatedInfo: Company) => console.log(`Info updated successfully`)),
      catchError(this.handleError<Company>('Update'))
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
