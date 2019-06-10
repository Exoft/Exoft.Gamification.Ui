import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-achievements',
  templateUrl: './personal-achievements.component.html',
  styleUrls: ['./personal-achievements.component.scss']
})
export class PersonalAchievementsComponent implements OnInit {

  

  public pageData: any = [];

  ngOnInit() {
    for (let index = 0; index < 4; index++) {
      this.pageData.push(this.userInfo());
    }
    
  }

  private userInfo() {
    return {
      img: '../../assets/images/star@2x.png',
      name: `Achievement ${Math.floor(Math.random() * 10)}`,
      date: new Date().toUTCString()
    }
  }
  }


