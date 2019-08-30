import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

import {environment} from '../../environments/environment';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject$ = new BehaviorSubject({});

  constructor(private http: HttpClient) {
  }

  public setUserData(userInfo: any) {
    this.userDataSubject$.next(userInfo);
  }

  public getUserData(): Observable<any> {
    return this.userDataSubject$.asObservable();
  }

  public getUserInfoById(userId: string): Observable<any> {
    return this.http.get(environment.apiUrl + `/api/users/${userId}`);
  }

  public getCurrentUserInfo(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/users/current-user');
  }

  public updateUserInfo(formData: any): Observable<any> {
    return this.http.put(environment.apiUrl + '/api/users/current-user', formData);
  }

}
