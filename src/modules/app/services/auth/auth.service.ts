import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDrawer } from '@angular/material';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }

  private readonly apiUrl = environment.apiUrl;
  @ViewChild('drawer') public drawer: MatDrawer;

  public signIn(loginData: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/authenticate', loginData);
  }

  public onLogOut(): void {
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
    this.http.post(url, {refreshToken: String(refreshToken)}).subscribe((res: any) => {
      const token = res.token;
      const newRefreshToken = res.refreshToken;
      localStorage.setItem('refreshToken', newRefreshToken);
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', res.tokenExpiration);
    });
  }

  public sendForgotPasLink(forgotPasData: object) {
    return this.http.post(environment.apiUrl + '/api/authenticate/forgot-password', forgotPasData);
  }

  public changePassword(changePasData: object) {
    return this.http.post(environment.apiUrl + '/api/authenticate/reset-password', changePasData);
  }

}
