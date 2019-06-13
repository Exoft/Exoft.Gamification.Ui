import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserInfo(userId: any): Observable<any> {
    // return this.http.get(environment.apiUrl + '/api/users/' + userId);
    return of(
      new HttpResponse({
        status: 200,
        body: {
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxOAXqa96ewc_EUYvIjO6oefUTlGg1qo_AMJv7qQQlhP3vns2IA',
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
    return this.http.put(environment.apiUrl + 'api/users' + userId, formData);
  }
}
