import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class RequestService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }
  public getAchievementsInfo(currentPage: any, pageSize: any): Observable<any> {
    const params = new HttpParams();
    params.set('pageSize', pageSize).set('currentPage', currentPage);
    return this.httpClient.get(`${this.apiUrl}/api/users/current-user/achievements`, { params });
  }

  public getUserInfo(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/users/current-user-info`);
  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/users`);
  }

  public getCurrentUser(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/users/current-user`);
  }

  public getCurrentUserById(userID: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/users/${userID}` );
  }

  public getCurrentUserAchievements(userID: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/users/${userID}/achievements`);
  }

}
