import {Component, OnInit} from '@angular/core';

import {RequestService} from 'src/modules/app/services/request.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {finalize} from 'rxjs/operators';
import {DashboardComponent, DashboardService} from '../../services/dashboard.service';


@Component({
  selector: 'app-exoft-achievements',
  templateUrl: './exoft-achievements.component.html',
  styleUrls: ['./exoft-achievements.component.scss']
})
export class ExoftAchievementsComponent implements OnInit {

  public pageData: any = [];
  public letterAvatar = getFirstLetters;

  constructor(private requestService: RequestService,
              private dialogService: DialogService,
              private readonly dashboardService: DashboardService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public calculateEvents(arr: any): number {
    return arr.length;
  }

  public openOtherUserInfoDialog(userId: string): void {
    this.dialogService.openInfoModal(userId);
  }

  private loadData(): void {
    this.dashboardService.setComponentLoadingStatus(DashboardComponent.exoftAchievements, true);
    this.requestService.getEvents()
      .pipe(finalize(() => this.dashboardService.setComponentLoadingStatus(DashboardComponent.exoftAchievements, false)))
      .subscribe(response => {
        this.pageData = response.data;
      });
  }
}
