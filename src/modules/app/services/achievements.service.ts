import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Achievement} from '../models/achievement/achievement';
import {AchievementCreate} from '../models/achievement/achievement-create';
import {PaginatedData} from '../models/paginated-data';
import {UserAchievement} from '../models/achievement/user-achievement';
import {AssignUserAchievement} from '../models/achievement/assign-user-achievement';


@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  constructor(private http: HttpClient) {
  }

  getCurrentUserAchievements(currentPage: number, pageSize: number = 0): Observable<any> {
    let params = new HttpParams().set('currentPage', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get(
      `${environment.apiUrl}/api/users/current-user/achievements`,
      {params}
    );
  }

  addNewAchievement(achievement: AchievementCreate): Observable<Achievement> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    Object.keys(achievement).forEach(key => {
      formData.append(key, achievement[key]);
    });

    return this.http.post<Achievement>(`${environment.apiUrl}/api/achievements`, formData, {headers});
  }

  updateAchievementById(achievementId: string, achievement: AchievementCreate): Observable<Achievement> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    Object.keys(achievement).forEach(key => {
      formData.append(key, achievement[key]);
    });

    return this.http.put<Achievement>(`${environment.apiUrl}/api/achievements/${achievementId}`, formData, {headers});
  }

  deleteAchievementById(achievementId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/achievements/${achievementId}`);
  }

  getAllAchievements(currentPage: number = 1, pageSize: number = 0): Observable<PaginatedData<Achievement>> {
    let params = new HttpParams();
    params = params.append('currentPage', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<PaginatedData<Achievement>>(`${environment.apiUrl}/api/achievements`, {params});
  }

  getAchievementsByUserId(userId: string, currentPage: number = 1, pageSize: number = 0): Observable<PaginatedData<UserAchievement>> {
    let params = new HttpParams();
    params = params.append('currentPage', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<PaginatedData<UserAchievement>>(`${environment.apiUrl}/api/users/${userId}/achievements`, {params});
  }

  addOrUpdateUserAchievements(userId: string, achievementsIds: string[]): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/users/${userId}/achievements`, achievementsIds);
  }

  updateUserAchievements(userId: string, achievements: AssignUserAchievement) {
    return this.http.post(`${environment.apiUrl}/api/users/${userId}/achievements`, achievements);
  }
}
