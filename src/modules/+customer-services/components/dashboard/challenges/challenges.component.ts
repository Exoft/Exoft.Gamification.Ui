import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  public pageData: any = [];

  public ngOnInit(): void {
    for (let index = 0; index < 18; index++) {
      this.pageData.push(this.userInfo());
    }
  }

  private userInfo(): object {
    return {
      img: 'https://cdn141.picsart.com/296755352173201.jpg?c256x256',
      text: '5K Swim'
    };
  }
}

