import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

const userToken = localStorage.getItem('accessToken');

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (userToken) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + userToken
        }
      });
    }
    return next.handle(req);
  }
}
