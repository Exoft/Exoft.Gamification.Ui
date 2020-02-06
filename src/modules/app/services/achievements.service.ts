import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Achievement} from '../models/achievement/achievement';
import {PostAchievement} from '../models/achievement/post-achievement';
import {ReturningPagingInfo} from '../models/user/return-page-info';
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

  addNewAchievement(achievement: PostAchievement): Observable<Achievement> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    Object.keys(achievement).forEach(key => {
      formData.append(key, achievement[key]);
    });

    return this.http.post<Achievement>(`${environment.apiUrl}/api/achievements`, formData, {headers});
  }

  updateAchievementById(achievementId: string, achievement: PostAchievement): Observable<Achievement> {
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

  getAllAchievements(): Observable<ReturningPagingInfo<Achievement>> {
    return this.http.get<ReturningPagingInfo<Achievement>>(`${environment.apiUrl}/api/achievements`);
  }

  getAchievementsByUserId(userId: string): Observable<ReturningPagingInfo<UserAchievement>> {
    return this.http.get<ReturningPagingInfo<UserAchievement>>(`${environment.apiUrl}/api/users/${userId}/achievements`);
  }

  addOrUpdateUserAchievements(userId: string, achievementsIds: string[]): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/users/${userId}/achievements`, achievementsIds);
  }

  updateUserAchievements(userId: string, achievements: AssignUserAchievement) {
    return this.http.post(`${environment.apiUrl}/api/users/${userId}/achievements`, achievements);
  }
}
