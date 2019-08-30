import { Component, OnInit } from '@angular/core';
import { AchievementsService } from 'src/modules/app/services/achievements.service';

@Component({
  selector: 'app-full-list-of-achievements',
  templateUrl: './full-list-of-achievements.component.html',
  styleUrls: ['./full-list-of-achievements.component.scss']
})
export class FullListOfAchievementsComponent implements OnInit {
  public achievementsList = [{}];

  constructor(private achievementsService: AchievementsService) {}

  ngOnInit() {
    this.getUserAchievements();
  }

  getUserAchievements() {
    this.achievementsService.getCurrentUserAchievements(1).subscribe(res => {
      this.achievementsList = res.data;
    });
  }
}
