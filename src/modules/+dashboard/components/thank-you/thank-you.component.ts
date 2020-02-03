import {Component, Input, OnInit} from '@angular/core';

import {RequestService} from 'src/modules/app/services/request.service';
import {ThankYouService} from 'src/modules/app/services/thank-you.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {DashboardComponent, DashboardService} from '../../services/dashboard.service';
import {finalize} from 'rxjs/operators';
import {BadgesComponent, BadgesService} from '../../../+badges/services/badges.service';


@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  @Input() isDashboardComponent = true;

  public pageData: any;
  public letterAvatar = getFirstLetters;

  constructor(private requestService: RequestService,
              private thankYouService: ThankYouService,
              private dialogService: DialogService,
              private readonly dashboardService: DashboardService,
              private readonly badgesService: BadgesService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public openUserProfile(): void {
    this.dialogService.openInfoModal(this.pageData.userId);
  }

  private loadData(): void {
    this.isDashboardComponent
      ? this.dashboardService.setComponentLoadingStatus(DashboardComponent.thankYou, true)
      : this.badgesService.setComponentLoadingStatus(BadgesComponent.thankYou, true);

    this.thankYouService.getThankYouMessage()
      .pipe(finalize(() => this.hideSpinner()))
      .subscribe(res => {
        this.pageData = res;
      });
  }

  private hideSpinner() {
    this.isDashboardComponent
      ? this.dashboardService.setComponentLoadingStatus(DashboardComponent.thankYou, false)
      : this.badgesService.setComponentLoadingStatus(BadgesComponent.thankYou, false);
  }
}
