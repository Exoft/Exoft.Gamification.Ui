import { Injectable, ViewChild } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map, share, first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  private readonly apiUrl = environment.apiUrl;
  @ViewChild('drawer') public drawer: MatDrawer;

  public signIn(loginData: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/authenticate', loginData);
  }

  public onLogOut() {
    // localStorage.removeItem('token');
    // this.drawer.close();
    this.router.navigate(['/signin']);
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  public refreshToken() {
    const url = `${this.apiUrl}/api/authenticate/refresh`;
    const refreshToken = localStorage.getItem('refreshToken');
    this.http.post(url, { refreshToken: String(refreshToken) }).subscribe((res: any) => {
      const token = res.token;
      const newRefreshToken = res.refreshToken;
      localStorage.setItem('refreshToken', newRefreshToken);
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', res.tokenExpiration);
    });
  }

}
