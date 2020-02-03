import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export enum DashboardComponent {
  topChart,
  exoftAchievements,
  personalAchievements,
  thankYou
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private componentLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private components: { component: DashboardComponent, loading: boolean }[] = [];

  constructor() {
    this.setComponents();
  }

  private setComponents() {
    this.components = [
      {component: DashboardComponent.topChart, loading: false},
      {component: DashboardComponent.exoftAchievements, loading: false},
      {component: DashboardComponent.personalAchievements, loading: false},
      {component: DashboardComponent.thankYou, loading: false}
    ];
  }

  private setComponentsLoadingStatus() {
    const isSomeComponentsLoading = this.components.some(c => c.loading === true);
    this.componentLoading.next(isSomeComponentsLoading);
  }

  refreshComponentsStatus() {
    this.components.forEach(c => c.loading = false);
  }

  setComponentLoadingStatus(component: DashboardComponent, status: boolean) {
    this.components.find(c => c.component === component).loading = status;
    this.setComponentsLoadingStatus();
  }

  getComponentsLoadingStatus() {
    return this.componentLoading.asObservable();
  }
}
