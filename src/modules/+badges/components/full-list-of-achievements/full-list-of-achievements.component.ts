import {Component, OnInit} from '@angular/core';

import {AchievementsService} from 'src/modules/app/services/achievements.service';
import {RequestService} from '../../../app/services/request.service';
import {BadgesComponent, BadgesService} from '../../services/badges.service';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../../app/services/alert.service';


@Component({
  selector: 'app-full-list-of-achievements',
  templateUrl: './full-list-of-achievements.component.html',
  styleUrls: ['./full-list-of-achievements.component.scss']
})
export class FullListOfAchievementsComponent implements OnInit {
  public achievementsList = [];

  constructor(private achievementsService: AchievementsService,
              private readonly requestService: RequestService,
              private readonly badgesService: BadgesService,
              private readonly alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.getUserAchievements();
  }

  public getUserAchievements(): void {
    this.badgesService.setComponentLoadingStatus(BadgesComponent.fullListOfAchievements, true);
    this.achievementsService.getCurrentUserAchievements(1, 0)
      .pipe(finalize(() => this.badgesService.setComponentLoadingStatus(BadgesComponent.fullListOfAchievements, false)))
      .subscribe(res => {
        this.achievementsList = res.data;
      },
        error => this.alertService.error());
  }

  getAchievementIconUrl(iconId: string) {
    return this.requestService.getAvatar(iconId);
  }
}
