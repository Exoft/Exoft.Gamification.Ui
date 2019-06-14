import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  public pageData: any = [];
  private userInfo() {
    return {
      img: 'https://www.lovethegarden.com/sites/default/files/content/articles/UK_wildbirds-01-robin.jpg',
      text: 'Some text'
    };
  }

  ngOnInit() {
    for (let index = 0; index < 10; index++) {
      this.pageData.push(this.userInfo());
    }
  }

}

