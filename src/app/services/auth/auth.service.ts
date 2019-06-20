import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn(loginData: any): Observable<any> {
    // return this.http.post(environment.apiUrl + '/api/authenticate', loginData);
    return of(
      new HttpResponse({ status: 200, body: { token: 'fake-token' } })
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }
}
