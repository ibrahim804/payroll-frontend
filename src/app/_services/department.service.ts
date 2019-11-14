import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartment(){
    return this.http.get("http://192.168.0.158:8000/api/departments");
  }

  getDesignation(department_id){
    return this.http.get("http://192.168.0.158:8000/api/department/" + department_id + "/designations");
  }

  getEmployee(department_id, designation_id){
    return this.http.get("http://192.168.0.158:8000/api/department/" + department_id + "/designation/" + designation_id);
  }
}
