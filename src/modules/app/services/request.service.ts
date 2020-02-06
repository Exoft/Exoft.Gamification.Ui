import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ReadAchievementRequest} from '../models/achievement-request/read-achievement-request';
import {User} from '../models/user/user';
import {ReturningPagingInfo} from '../models/user/return-page-info';
import {Achievement} from '../models/achievement/achievement';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getAchievementsInfo(currentPage: any, pageSize: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('pageSize', pageSize);
    params = params.set('currentPage', currentPage);
    return this.httpClient.get(
      `${this.apiUrl}/api/users/current-user/achievements`,
      {params}
    );
  }

  public getAllUsers(currentPage: number = null, pageSize: number = null): Observable<any> {
    let params = new HttpParams();
    if (!!currentPage) {
      params = params.append('currentPage', currentPage.toString());
    }
    if (!!pageSize) {
      params = params.append('pageSize', pageSize.toString());
    }
    return this.httpClient.get<any>(`${this.apiUrl}/api/users/with-short-info`, {params});
  }

  public getCurrentUserById(userID: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/api/users/${userID}`);
  }

  public getCurrentUserAchievements(userID: string, currentPage: number = 1, pageSize: number = 0): Observable<any> {
    let params = new HttpParams();
    params = params.append('currentPage', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.httpClient.get(`${this.apiUrl}/api/users/${userID}/achievements`, {params});
  }

  public getEvents(): Observable<any> {
    let params = new HttpParams();
    params = params.append('currentPage', '1');
    params = params.append('pageSize', '0');

    return this.httpClient.get(`${this.apiUrl}/api/events`, {params});
  }

  public getAllAchievements(currentPage: number = 1, pageSize: number = 0): Observable<ReturningPagingInfo<Achievement>> {
    let params = new HttpParams();
    params = params.append('currentPage', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.httpClient.get<ReturningPagingInfo<Achievement>>(`${this.apiUrl}/api/achievements`, {params});
  }

  public requestAchievement(formData: any): Observable<any> {
    return this.httpClient.post(
      environment.apiUrl + '/api/request-achievement',
      formData
    );
  }

  public getAllAchievementRequests(): Observable<ReadAchievementRequest[]> {
    return this.httpClient.get<ReadAchievementRequest[]>(
      environment.apiUrl + '/api/request-achievement'
    );
  }

  public getAvatar(avatarId: any) {
    return environment.apiUrl + '/api/files/' + avatarId;
  }

  public approveAchievementRequest(
    achievementRequestId: string
  ): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiUrl + `/api/request-achievement/${achievementRequestId}`,
      {}
    );
  }

  public declineAchievementRequest(
    achievementRequestId: string
  ): Observable<any> {
    return this.httpClient.delete(
      environment.apiUrl + `/api/request-achievement/${achievementRequestId}`
    );
  }
}
