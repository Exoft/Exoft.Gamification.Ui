import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

import {environment} from '../../../environments/environment';
import {User} from '../models/user';


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

  public updateUserInfoById(userId: string, userInfo: any): Observable<any> {
    return this.http.put(environment.apiUrl + `/api/users/${userId}`, userInfo);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + `/api/users`, user);
  }

  public deleteUserById(userId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/api/users/${userId}`);
  }
}
