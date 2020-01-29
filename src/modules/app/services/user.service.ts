import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

import {environment} from '../../../environments/environment';
import {User} from '../models/user/user';
import {PostUser} from '../models/user/post-user';
import {UpdateUser} from '../models/user/update-user';

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

  public getUserInfoById(userId: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/api/users/${userId}`);
  }

  public getCurrentUserInfo(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/users/current-user');
  }

  public updateUserInfo(formData: any): Observable<any> {
    return this.http.put(environment.apiUrl + '/api/users/current-user', formData);
  }

  public updateUserInfoById(userId: string, userInfo: UpdateUser): Observable<User> {
    return this.http.put<User>(environment.apiUrl + `/api/users/${userId}`, userInfo);
  }

  public createUser(user: PostUser): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    Object.keys(user).forEach((key: any) => {
      formData.append(key, user[key]);
    });
    return this.http.post<User>(`${environment.apiUrl}/api/users`, formData, {headers});
  }

  public deleteUserById(userId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `/api/users/${userId}`);
  }

  getAvatarUrl(avatarId: string) {
    return `${environment.apiUrl}/api/files/${avatarId}`;
  }
}
