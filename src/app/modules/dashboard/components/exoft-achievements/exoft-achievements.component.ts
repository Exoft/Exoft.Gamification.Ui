import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exoft-achievements',
  templateUrl: './exoft-achievements.component.html',
  styleUrls: ['./exoft-achievements.component.scss']
})
export class ExoftAchievementsComponent implements OnInit {

  public pageData : any =[];
  ngOnInit() {
    for (let index = 0; index < 10; index++) {
      this.pageData.push(this.userInfo());
    }
  }

  private userInfo() {
    return {
      img: '../../assets/images/star@2x.png',
      name: `Name Surname ${Math.floor(Math.random() * 10)}`,     
      time: `${Math.floor(Math.random() * 10)} mins ago`,
      achievement: `Gained some achievement`
    };
  }
}
