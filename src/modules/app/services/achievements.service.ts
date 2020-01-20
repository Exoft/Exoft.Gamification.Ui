import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Achievement} from '../models/achievement/achievement';
import { PostAchievement } from '../models/achievement/post-achievement';


@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  constructor(private http: HttpClient) {
  }

  getCurrentUserAchievements(currentPage: any, pageSize?: any): Observable<any> {
    let params = new HttpParams().set('currentPage', currentPage);
    if (pageSize) {
      params = params.append('pageSize', pageSize);
    }
    return this.http.get(
      `${environment.apiUrl}/api/users/current-user/achievements`,
      {params}
    );
  }

  addNewAchievement(achievement: PostAchievement): Observable<Achievement> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    Object.keys(achievement).forEach(function (key) {
      formData.append(key, achievement[key]);
    });

    return this.http.post<Achievement>(`${environment.apiUrl}/api/achievements`, formData, { headers: headers });
  }

  updateAchievementById(achievementId: string, achievement: PostAchievement): Observable<Achievement> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    Object.keys(achievement).forEach(function (key) {
      formData.append(key, achievement[key]);
    });
    
    return this.http.put<Achievement>(`${environment.apiUrl}/api/achievements/${achievementId}`, formData, { headers: headers });
  }

  deleteAchievementById(achievementId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/achievements/${achievementId}`);
  }

  getAllAchievements(): Observable<Array<Achievement>> {
    return this.http.get<Array<Achievement>>(`${environment.apiUrl}/api/achievements`);
  }

  getAchievementsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/users/${userId}/achievements`);
  }

  addOrUpdateUserAchievements(userId: string, achievements: Achievement[]): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/users/${userId}/achievements`, achievements);
  }
}
