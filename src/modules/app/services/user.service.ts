import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs';

import {environment} from '../../../environments/environment';
import {User} from '../models/user/user';
import {UserCreate} from '../models/user/user-create';
import {UserEdit} from '../models/user/user-edit';
import {ChangePassword} from '../models/password/change-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject$ = new ReplaySubject(1);

  constructor(private http: HttpClient) {
  }

  public setUserData(userInfo: any) {
    this.userDataSubject$.next(userInfo);
  }

  public getUserData(): Observable<any> {
    return this.userDataSubject$.asObservable();
  }

  public getUserInfoById(userId: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/api/users/${userId}`);
  }

  public getCurrentUserInfo(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/users/current-user');
  }

  public updateUserInfo(formData: any): Observable<any> {
    return this.http.put(environment.apiUrl + '/api/users/current-user', formData);
  }

  public updateUserInfoById(userId: string, formData: FormData): Observable<User> {
    return this.http.put<User>(environment.apiUrl + `/api/users/${userId}`, formData);
  }

  public createUser(user: UserCreate): Observable<User> {
    const formData = new FormData();
    Object.keys(user).forEach((key: any) => {
      formData.append(key, !!user[key] ? user[key] : '');
    });
    return this.http.post<User>(`${environment.apiUrl}/api/users`, formData);
  }

  public deleteUserById(userId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/api/users/${userId}`);
  }

  getAvatarUrl(avatarId: string) {
    return `${environment.apiUrl}/api/files/${avatarId}`;
  }

  changePassword(passwordData: ChangePassword) {
    return this.http.post(`${environment.apiUrl}/api/users/change-password`, passwordData);
  }
}
