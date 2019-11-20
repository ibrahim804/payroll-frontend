import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private authService: AuthService) { }
}
