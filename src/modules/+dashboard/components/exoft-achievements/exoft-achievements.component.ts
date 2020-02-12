import {Component, OnDestroy, OnInit} from '@angular/core';

import {RequestService} from 'src/modules/app/services/request.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {finalize} from 'rxjs/operators';
import {DashboardComponent, DashboardService} from '../../services/dashboard.service';
import {AlertService} from '../../../app/services/alert.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-exoft-achievements',
  templateUrl: './exoft-achievements.component.html',
  styleUrls: ['./exoft-achievements.component.scss']
})
export class ExoftAchievementsComponent implements OnInit, OnDestroy {
  private dialogRef: MatDialogRef<any>;
  private eventsCurrentPage = 0;

  public eventsCount = 0;
  public pageData: any[] = [];
  public letterAvatar = getFirstLetters;

  public isDataLoading = false;

  constructor(private requestService: RequestService,
              private dialogService: DialogService,
              private readonly dashboardService: DashboardService,
              private readonly alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.loadInitialData();
  }

  public ngOnDestroy(): void {
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public openOtherUserInfoDialog(userId: string): void {
    this.dialogRef = this.dialogService.openInfoModal(userId);
  }

  private loadInitialData(): void {
    this.dashboardService.setComponentLoadingStatus(DashboardComponent.exoftAchievements, true);
    this.requestService.getEvents(++this.eventsCurrentPage)
      .pipe(finalize(() => this.dashboardService.setComponentLoadingStatus(DashboardComponent.exoftAchievements, false)))
      .subscribe(response => {
          this.pageData = response.data;
          this.eventsCount = response.totalItems;
        },
        error => this.alertService.error());
  }

  onScroll(scrollEvent) {
    const isEventsCountDiff: boolean = this.eventsCount - this.pageData.length > 0;
    const isScrollDiff: boolean = scrollEvent.target.scrollHeight - scrollEvent.target.scrollTop === scrollEvent.target.offsetHeight;

    if (isEventsCountDiff && !this.isDataLoading && isScrollDiff) {
      this.isDataLoading = true;
      this.requestService.getEvents(++this.eventsCurrentPage)
        .pipe(finalize(() => this.isDataLoading = false))
        .subscribe(
          res => {
            this.pageData = this.pageData.concat(res.data);
          },
          error => {
            this.alertService.error();
          }
        );
    }
  }
}
