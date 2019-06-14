import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-achivements',
  templateUrl: './last-achivements.component.html',
  styleUrls: ['./last-achivements.component.scss']
})
export class LastAchivementsComponent implements OnInit {
  public achivementsList = [
    {
      achivement: 'Taxi driver',
      expPoints: 50,
      date: 'Today, 10:43 AM'
    },
    {
      achivement: 'Taxi driver',
      expPoints: 50,
      date: 'Today, 8:43 AM'
    },
    {
      achivement: 'Taxi driver',
      expPoints: 50,
      date: 'Yesterday, 9:45 PM'
    },
    {
      achivement: 'Taxi driver',
      expPoints: 50,
      date: '27 June, 8:43 AM'
    },
    {
      achivement: 'Taxi driver',
      expPoints: 50,
      date: '27 June, 8:43 AM'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
