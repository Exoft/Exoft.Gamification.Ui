import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AchievementRequestWithDetails} from '../models/achievement-request/achievement-request-with-details';
import {User} from '../models/user/user';
import {PaginatedData} from '../models/paginated-data';
import {Achievement} from '../models/achievement/achievement';
import {OrderCreate} from '../models/orders/order-create';
import {Order} from '../models/orders/order';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  // User Requests
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


  // Achievement Requests
  public getAchievementsInfo(currentPage: any, pageSize: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('pageSize', pageSize);
    params = params.set('currentPage', currentPage);
    return this.httpClient.get(
      `${this.apiUrl}/api/users/current-user/achievements`,
      {params}
    );
  }

  public getAllAchievements(currentPage: number = 1, pageSize: number = 0): Observable<PaginatedData<Achievement>> {
    let params = new HttpParams();
    params = params.append('currentPage', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.httpClient.get<PaginatedData<Achievement>>(`${this.apiUrl}/api/achievements`, {params});
  }


  // User-Achievement Requests
  public getCurrentUserAchievements(userID: string, currentPage: number = 1, pageSize: number = 0): Observable<any> {
    let params = new HttpParams();
    params = params.append('currentPage', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.httpClient.get(`${this.apiUrl}/api/users/${userID}/achievements`, {params});
  }

  public requestAchievement(formData: any): Observable<any> {
    return this.httpClient.post(
      environment.apiUrl + '/api/request-achievement',
      formData
    );
  }

  public getAllAchievementRequests(): Observable<AchievementRequestWithDetails[]> {
    return this.httpClient.get<AchievementRequestWithDetails[]>(
      environment.apiUrl + '/api/request-achievement'
    );
  }

  public approveAchievementRequest(achievementRequestId: string): Observable<any> {
    return this.httpClient.post<any>(
      environment.apiUrl + `/api/request-achievement/${achievementRequestId}`,
      {}
    );
  }

  public declineAchievementRequest(achievementRequestId: string): Observable<any> {
    return this.httpClient.delete(
      environment.apiUrl + `/api/request-achievement/${achievementRequestId}`
    );
  }


  // Event Requests
  public getEvents(currentPage: number = 0): Observable<any> {
    let params = new HttpParams();
    params = params.append('currentPage', currentPage.toString());
    params = params.append('pageSize', '10');

    return this.httpClient.get(`${this.apiUrl}/api/events`, {params});
  }


  // File Requests
  public getAvatar(avatarId: any) {
    return environment.apiUrl + '/api/files/' + avatarId;
  }

  // Orders Requests
  getOrders(currentPage: number = 1, pageSize: number = 0): Observable<PaginatedData<OrderCreate>> {
    let params = new HttpParams();
    params = params.append('currentPage', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.httpClient.get<PaginatedData<OrderCreate>>(`${this.apiUrl}/api/orders`, {params});
  }

  createOrder(orderFormData: FormData): Observable<Order> {
    return this.httpClient.post<Order>(`${this.apiUrl}/api/orders`, orderFormData);
  }

  deleteOrder(orderId: string) {
    return this.httpClient.delete(`${this.apiUrl}/api/orders/${orderId}`);
  }
}
