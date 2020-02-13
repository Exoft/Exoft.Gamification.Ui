import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export enum BadgesComponent {
  fullListOfAchievements,
  lastAchievements,
  thankYou
}

@Injectable({
  providedIn: 'root'
})
export class BadgesService {
  private componentLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private components: { component: BadgesComponent, loading: boolean }[] = [];

  constructor() {
    this.setComponents();
  }

  private setComponents() {
    this.components = [
      {component: BadgesComponent.fullListOfAchievements, loading: false},
      {component: BadgesComponent.lastAchievements, loading: false},
      {component: BadgesComponent.thankYou, loading: false}
    ];
  }

  private setComponentsLoadingStatus() {
    const isSomeComponentsLoading = this.components.some(c => c.loading === true);
    this.componentLoading.next(isSomeComponentsLoading);
  }

  refreshComponentsStatus() {
    this.components.forEach(c => c.loading = false);
  }

  setComponentLoadingStatus(component: BadgesComponent, status: boolean) {
    this.components.find(c => c.component === component).loading = status;
    this.setComponentsLoadingStatus();
  }

  getComponentsLoadingStatus() {
    return this.componentLoading.asObservable();
  }
}
