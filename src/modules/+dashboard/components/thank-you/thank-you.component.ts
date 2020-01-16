import {Component, OnInit} from '@angular/core';

import {RequestService} from 'src/modules/app/services/request.service';
import {ThankYouService} from 'src/modules/app/services/thank-you.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {getFirstLetters} from '../../../app/utils/letterAvatar';


@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public pageData: any;
  public letterAvatar = getFirstLetters;

  constructor(private requestService: RequestService,
              private thankYouService: ThankYouService,
              private dialogService: DialogService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public openUserProfile(): void {
    this.dialogService.openInfoModal(this.pageData.userId);
  }

  private loadData(): void {
    this.thankYouService.getThankYouMessage().subscribe(res => {
      this.pageData = res;
    });
  }
}
