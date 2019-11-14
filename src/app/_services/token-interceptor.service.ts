import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
    let authService = this.injector.get(AuthenticationServiceService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Accept: `application/json`,
        Authorization: `Bearer ${authService.getToken()}`
      }
    })

    return next.handle(tokenizedReq);
  }
}
