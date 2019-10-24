import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService  } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    // console.log(userToken);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    const expires = localStorage.getItem('tokenExpiration');
    const expiresTime = new Date(expires).getTime();
    if (req.url.includes('authenticate')) {
      return next.handle(req);
    }
    if (expiresTime <= (new Date().getTime())) {
      this.authService.refreshToken();
    }

    return next.handle(req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + userToken
      }
    })).pipe(
      catchError((error: any) => {
        if (this.activeRoute.snapshot.queryParams.secretString) {
          return throwError(error);
        }
        if (error.status === 401) {
          this.authService.onLogOut();
        }

        return throwError(error);
      })
    );
  }
}



