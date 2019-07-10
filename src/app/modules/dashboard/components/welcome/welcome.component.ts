import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/dashboardequest.service';
import * as moment from 'moment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private requestService: RequestService) { }
  public pageData: any = [];
  public response: any = [];
  public welcomeGreeting = this.getWelcomeGreeting();
  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.requestService.getUserInfo().subscribe(response => {
      this.pageData = response;
    });
  }

  public getWelcomeGreeting() {
    const currentTime: Date = new Date();
    const currentTimeHours = currentTime.getHours();
    let greeting: string;
    if (currentTimeHours >= 12 && currentTimeHours < 18) {
      return greeting = 'Good day';
    }
    if (currentTimeHours >= 18 && currentTimeHours < 24) {
      return greeting = 'Good evening';
    }
    if (currentTimeHours >= 5 && currentTimeHours < 12) {
      return greeting = 'Good morning';
    }    else {
      return greeting = 'Good night';
    }

  }
}
