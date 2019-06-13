import { Component, OnInit } from '@angular/core';
import { setUserImage } from '../../../../helpers/user-avatar-styling';
@Component({
  selector: 'app-exoft-achievements',
  templateUrl: './exoft-achievements.component.html',
  styleUrls: ['./exoft-achievements.component.scss']
})
export class ExoftAchievementsComponent implements OnInit {

  public pageData: any = [];

  ngOnInit() {
    for (let index = 0; index < 10; index++) {
      this.pageData.push(this.userInfo());
    }
  }
  private userInfo() {
    return {
      img: 'https://img2.akspic.ru/image/83780-klyuv-vorobinye_pticy-staryj_mir_ivolga-zyablik-hishhnaya_ptica-1920x1080.jpg?attachment=1',
      name: `Name Surname ${Math.floor(Math.random() * 10)}`,
      time: `${Math.floor(Math.random() * 10)} min. ago`,
      achievement: `Gained some achievement`
    };
  }
}
