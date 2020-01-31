import {Component, OnInit} from '@angular/core';
import {AchievementsService} from 'src/modules/app/services/achievements.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {RequestService} from '../../../app/services/request.service';


@Component({
  selector: 'app-last-achievements',
  templateUrl: './last-achievements.component.html',
  styleUrls: ['./last-achievements.component.scss']
})
export class LastAchievementsComponent implements OnInit {
  public achievementsList = [];

  constructor(private achievementsService: AchievementsService,
              private requestService: RequestService,
              private dialogService: DialogService) {
  }

  public ngOnInit(): void {
    this.getUserLastAchievements();
  }

  public getUserLastAchievements(): void {
    this.achievementsService.getCurrentUserAchievements(1, 5).subscribe(res => {
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
