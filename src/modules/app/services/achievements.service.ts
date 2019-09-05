import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Achievement} from "../models/achievement";

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  constructor(private http: HttpClient) {
  }

  getCurrentUserAchievements(
    currentPage: any,
    pageSize?: any
  ): Observable<any> {
    let params = new HttpParams().set('currentPage', currentPage);
    if (pageSize) {
      params = params.append('pageSize', pageSize);
    }
    return this.http.get(
      `${environment.apiUrl}/api/users/current-user/achievements`,
      {params}
    );
  }

  addNewAchievement(achievement: Achievement): Observable<Achievement> {
    return this.http.post<Achievement>(`${environment.apiUrl}/api/achievements`, achievement);
  }

  updateAchievementById(achievementId: string, achievement: Achievement): Observable<Achievement> {
    return this.http.put<Achievement>(`${environment.apiUrl}/api/achievements/${achievementId}`, achievement);
  }

  deleteAchievementById(achievementId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/achievements/${achievementId}`);
  }
}
