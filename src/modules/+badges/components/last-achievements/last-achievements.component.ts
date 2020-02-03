import {Component, OnInit} from '@angular/core';
import {AchievementsService} from 'src/modules/app/services/achievements.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {RequestService} from '../../../app/services/request.service';
import {BadgesComponent, BadgesService} from '../../services/badges.service';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-last-achievements',
  templateUrl: './last-achievements.component.html',
  styleUrls: ['./last-achievements.component.scss']
})
export class LastAchievementsComponent implements OnInit {
  public achievementsList = [];

  constructor(private achievementsService: AchievementsService,
              private requestService: RequestService,
              private dialogService: DialogService,
              private readonly badgesService: BadgesService) {
  }

  public ngOnInit(): void {
    this.getUserLastAchievements();
  }

  public getUserLastAchievements(): void {
    this.badgesService.setComponentLoadingStatus(BadgesComponent.lastAchievements, true);
    this.achievementsService.getCurrentUserAchievements(1, 5)
      .pipe(finalize(() => this.badgesService.setComponentLoadingStatus(BadgesComponent.lastAchievements, false)))
      .subscribe(res => {
        this.achievementsList = res.data;
      });
  }

  public openRequestAchievementsDialog(): void {
    this.dialogService.openRequestForm();
  }

  getAchievementIconUrl(iconId: string) {
    return this.requestService.getAvatar(iconId);
  }
}
