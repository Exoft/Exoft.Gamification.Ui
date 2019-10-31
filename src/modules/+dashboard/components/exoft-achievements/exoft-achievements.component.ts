import { Component, OnInit } from '@angular/core';

import { RequestService } from 'src/modules/app/services/dashboardequest.service';
import { DialogService } from 'src/modules/app/services/dialog.service';
import { getFirstLetters } from '../../../app/utils/letterAvatar';

@Component({
  selector: 'app-exoft-achievements',
  templateUrl: './exoft-achievements.component.html',
  styleUrls: ['./exoft-achievements.component.scss']
})

export class ExoftAchievementsComponent implements OnInit {

  public pageData: any = [];
  public letterAvatar = getFirstLetters;

  constructor(private requestService: RequestService, private dialogService: DialogService) { }

  public ngOnInit(): void {
    this.loadData();
  }
  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public calculateEvents(arr: any): number {
    return arr.length;
  }

  public openOtherUserInfoDialog(userId: string): void {
    this.dialogService.openInfoModal(userId);
  }

  private loadData(): void {
    this.requestService.getEvents().subscribe(response => {
      this.pageData = response.data;
    });
  }
}
