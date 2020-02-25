import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Injectable()
export class Interceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const userToken = localStorage.getItem('token');

    if (request.url.includes('authenticate')) {
      return next.handle(request);
    }

    return next.handle(this.addTokenToRequest(request, userToken))
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {
              case 401:
                return this.handleUnauthorizedError(request, next);
              case 403:
                return this.handleForbiddenError();
              default:
                return throwError(error);
            }
          } else {
            return throwError(error);
          }
        }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }

  private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);
      return this.authService.refreshToken()
        .pipe(
          switchMap((res: any) => {
            const {token, refreshToken} = res;

            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('token', token);

            this.tokenSubject.next(token);
            return next.handle(this.addTokenToRequest(request, token));
          }),
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse) {
              const errorStatus = error.status;

              if (errorStatus === 403) {
                return this.handleForbiddenError();
              }

              return this.logoutUser(error);
            } else {
              return this.logoutUser(error);
            }
          }),
          finalize(() => this.isRefreshingToken = false)
        );
    } else {
      return this.tokenSubject
        .pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }

  private handleForbiddenError() {
    this.router.navigate(['forbidden']);

    return throwError('');
  }

  private logoutUser(error) {
    this.authService.onLogOut();

    return throwError(error);
  }
}



