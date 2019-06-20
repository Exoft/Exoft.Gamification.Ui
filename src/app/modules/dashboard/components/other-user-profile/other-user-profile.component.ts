import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  public avatarSource =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxOAXqa96ewc_EUYvIjO6oefUTlGg1qo_AMJv7qQQlhP3vns2IA';
  public userName = 'Taras Shevchenko';
  public totalBadgesCount = 30;
  public xpCount = 1334;
  public status = '"I love alpacas!"';
  public pageData: any = [];
  private userInfo() {
    return {
      img: '../../assets/images/star@2x.png',
      text: '5K Swim',
      count: Math.floor(Math.random() * 10)
    };
  }

  ngOnInit() {
    for (let index = 0; index < 10; index++) {
      this.pageData.push(this.userInfo());
    }
  }

    closeOtherUser(): void {
      this.dialog.closeAll();
    }
}


