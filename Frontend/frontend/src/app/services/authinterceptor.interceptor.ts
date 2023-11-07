import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service'

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const authToken = this.authService.token;
    const authRequest = request.clone({headers:request.headers.set("Authorization", "Bearer " + authToken)});
    return next.handle(authRequest);
  }
}
