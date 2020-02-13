import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {RequestService} from 'src/modules/app/services/request.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {finalize} from 'rxjs/operators';
import {getFirstLetters} from '../../../../app/utils/letterAvatar';
import {DashboardComponent, DashboardService} from '../../../services/dashboard.service';
import {AlertService} from '../../../../app/services/alert.service';


@Component({
  selector: 'app-top-chart',
  templateUrl: './top-chart.component.html',
  styleUrls: ['./top-chart.component.scss']
})
export class TopChartComponent implements OnInit, OnDestroy {
  private dialogRef: MatDialogRef<any>;

  public pageData: any = [];
  public maxXp: number;
  public letterAvatar = getFirstLetters;

  constructor(public dialog: MatDialog,
              private requestService: RequestService,
              private dialogService: DialogService,
              private readonly dashboardService: DashboardService,
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

  public getMaxXp(xp: number): void {
    this.maxXp = xp;
  }

  public getXpValue(value: number): number {
    return (value * 100) / this.pageData[0].xp;
  }

  public openUserDetails(userId: any): void {
    this.dialogRef = this.dialogService.openInfoModal(userId);
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  private loadData(): void {
    this.dashboardService.setComponentLoadingStatus(DashboardComponent.topChart, true);
    this.requestService.getAllUsers()
      .pipe(finalize(() => this.dashboardService.setComponentLoadingStatus(DashboardComponent.topChart, false)))
      .subscribe(response => {
          // Take top five users
          this.pageData = response.data.sort((a, b) => b.xp - a.xp).slice(0, 5);
          this.getMaxXp(this.pageData[0].xp);
        },
        error => this.alertService.error());
  }
}
