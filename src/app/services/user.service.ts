import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject$ = new BehaviorSubject({});

  public setUser(userInfo: any) {
    this.userDataSubject$.next({ userInfo });
  }

  public getUser(): Observable<any> {
    return this.userDataSubject$.asObservable();
  }

  constructor(private http: HttpClient) {}

  public getUserInfo(userId: any): Observable<any> {
    // return this.http.get(environment.apiUrl + '/api/users/' + userId);
    return of(
      new HttpResponse({
        status: 200,
        body: {
          avatar:
            'https://www.lovethegarden.com/sites/default/files/content/articles/UK_wildbirds-01-robin.jpg',
          userName: 'Taras.Shevchenko',
          firstName: 'Taras',
          lastName: 'Shevchenko',
          emailAddress: 'taras.shevchenko@example.com',
          status: 'I love alpacas!'
        }
      })
    );
  }

  public updateUserInfo(formData: any, userId: any): Observable<any> {
    return this.http.put(environment.apiUrl + '/api/users/' + userId, formData);
  }
}
