import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/modules/app/services/dashboardequest.service';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import { ThankYouService } from 'src/modules/app/services/thank-you.service';
import { DialogService } from 'src/modules/app/services/dialog.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public pageData: any = [];
  public response: any = [];
  public letterAvatar = getFirstLetters;

  constructor(private requestService: RequestService, private thankYouService: ThankYouService, private dialogService: DialogService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.thankYouService.getThankYouMessage().subscribe(res => {
      this.pageData = res;
    });
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  // todo: bind method with user avatar
  public openUserProfile(): void {
    this.dialogService.openInfoModal(this.pageData.userId);
  }
}
