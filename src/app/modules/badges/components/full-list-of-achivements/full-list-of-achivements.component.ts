import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-list-of-achivements',
  templateUrl: './full-list-of-achivements.component.html',
  styleUrls: ['./full-list-of-achivements.component.scss']
})
export class FullListOfAchivementsComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
}
