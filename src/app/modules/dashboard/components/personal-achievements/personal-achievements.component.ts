import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/dashboardequest.service';

@Component({
  selector: 'app-personal-achievements',
  templateUrl: './personal-achievements.component.html',
  styleUrls: ['./personal-achievements.component.scss']
})
export class PersonalAchievementsComponent implements OnInit {
  public pageData: any = [];
  public response: any = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.requestService.getAchievementsInfo(1, 3).subscribe(response =>
      this.pageData = response.data
    );
  }

  public IconId(iconId: any) {
    return 'http://localhost:5000/api/files/' + iconId;
  }
}


