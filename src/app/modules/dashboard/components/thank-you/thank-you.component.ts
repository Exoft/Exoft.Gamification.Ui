import {Component, OnInit} from '@angular/core';
import { RequestService } from 'src/app/services/dashboardequest.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public pageData: any = [];
  public response: any = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.requestService.getUserInfo().subscribe(response =>
      this.pageData = response
    );
  }

  public AvatarId(avatarId: any) {
    return 'http://localhost:5000/api/files/' + avatarId;
  }
}
