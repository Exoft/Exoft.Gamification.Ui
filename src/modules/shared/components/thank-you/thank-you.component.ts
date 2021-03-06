import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {RequestService} from 'src/modules/app/services/request.service';
import {ThankYouService} from 'src/modules/app/services/thank-you.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../../app/services/alert.service';
import {MatDialogRef} from '@angular/material';
import {DashboardComponent, DashboardService} from '../../../+customer-services/services/dashboard.service';
import {BadgesComponent, BadgesService} from '../../../+customer-services/services/badges.service';


@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit, OnDestroy {
  @Input() isDashboardComponent = true;

  private dialogRef: MatDialogRef<any>;

  public pageData: any;
  public letterAvatar = getFirstLetters;

  constructor(private requestService: RequestService,
              private thankYouService: ThankYouService,
              private dialogService: DialogService,
              private readonly dashboardService: DashboardService,
              private readonly badgesService: BadgesService,
              private readonly alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public openUserProfile(): void {
    this.dialogRef = this.dialogService.openInfoModal(this.pageData.userId);
  }

  private loadData(): void {
    this.isDashboardComponent
      ? this.dashboardService.setComponentLoadingStatus(DashboardComponent.thankYou, true)
      : this.badgesService.setComponentLoadingStatus(BadgesComponent.thankYou, true);

    this.thankYouService.getThankYouMessage()
      .pipe(finalize(() => this.hideSpinner()))
      .subscribe(res => {
          this.pageData = res;
        },
        error => this.alertService.error());
  }

  private hideSpinner() {
    this.isDashboardComponent
      ? this.dashboardService.setComponentLoadingStatus(DashboardComponent.thankYou, false)
      : this.badgesService.setComponentLoadingStatus(BadgesComponent.thankYou, false);
  }
}
