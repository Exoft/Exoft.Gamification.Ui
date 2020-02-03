import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {RequestService} from 'src/modules/app/services/request.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {UserAchievement} from '../../../app/models/achievement/user-achievement';
import {DashboardComponent, DashboardService} from '../../services/dashboard.service';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-personal-achievements',
  templateUrl: './personal-achievements.component.html',
  styleUrls: ['./personal-achievements.component.scss']
})
export class PersonalAchievementsComponent implements OnInit {
  public achievements: UserAchievement[] = [];

  constructor(private requestService: RequestService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private readonly dashboardService: DashboardService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public openForm(): void {
    this.dialogService.openRequestForm();
  }

  private loadData(): void {
    this.dashboardService.setComponentLoadingStatus(DashboardComponent.personalAchievements, true);
    this.requestService.getAchievementsInfo(1, 4)
      .pipe(finalize(() => this.dashboardService.setComponentLoadingStatus(DashboardComponent.personalAchievements, false)))
      .subscribe(response => {
        this.achievements = response.data;
      });
  }

  getIconUrl(iconId: string) {
    return this.requestService.getAvatar(iconId);
  }
}
