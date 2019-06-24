import { Component, OnInit } from '@angular/core';
import { AchievementsService } from 'src/app/services/achievements.service';

@Component({
  selector: 'app-last-achievements',
  templateUrl: './last-achievements.component.html',
  styleUrls: ['./last-achievements.component.scss']
})
export class LastAchievementsComponent implements OnInit {
  public achievementsList = [{}];

  constructor(private achievementsService: AchievementsService) {}

  ngOnInit() {
    this.getUserLastAchievements();
  }

  getUserLastAchievements() {
    this.achievementsService.getCurrentUserAchievements(1, 5).subscribe(res => {
      this.achievementsList = res.data;
    });
  }
}
