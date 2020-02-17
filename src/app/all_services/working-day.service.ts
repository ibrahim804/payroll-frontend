import { Create } from './../config/interfaces/working-day.interface';
import { apiRoutes } from './../config/apiRoutes';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkingDayService {

  constructor(private authService: AuthService) { }

  createWorkingDay(data: Create) {
    return this.authService.postInHTTP(apiRoutes.workingDay, data);
  }
}
