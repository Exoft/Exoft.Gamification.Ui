import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/modules/app/services/dashboardequest.service';
import {getFirstLetters} from '../../../app/utils/letterAvatar';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public pageData: any = [];
  public response: any = [];
  public letterAvatar = getFirstLetters;

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
    this.requestService.getAvatar(avatarId);
  }

}
