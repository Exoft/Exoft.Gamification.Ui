import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-achivements-and-exp',
  templateUrl: './total-achivements-and-exp.component.html',
  styleUrls: ['./total-achivements-and-exp.component.scss']
})
export class TotalAchivementsAndExpComponent implements OnInit {
  public badgesCount = '50';
  public experienceCount = '1345';
  public avarageCount = '21';
  public newBadgesCount = '5';

  constructor() { }

  ngOnInit() {
  }

}
