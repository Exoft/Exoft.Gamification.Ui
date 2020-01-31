import {Component, OnInit} from '@angular/core';

import {AchievementsService} from 'src/modules/app/services/achievements.service';
import {RequestService} from '../../../app/services/request.service';


@Component({
  selector: 'app-full-list-of-achievements',
  templateUrl: './full-list-of-achievements.component.html',
  styleUrls: ['./full-list-of-achievements.component.scss']
})
export class FullListOfAchievementsComponent implements OnInit {
  public achievementsList = [];

  constructor(private achievementsService: AchievementsService, private readonly requestService: RequestService) {
  }

  public ngOnInit(): void {
    this.getUserAchievements();
  }

  public getUserAchievements(): void {
    this.achievementsService.getCurrentUserAchievements(1).subscribe(res => {
      this.achievementsList = res.data;
    });
  }

  getAchievementIconUrl(iconId: string) {
    return this.requestService.getAvatar(iconId);
  }
}
