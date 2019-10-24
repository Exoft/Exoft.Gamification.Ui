import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RequestService } from 'src/modules/app/services/dashboardequest.service';
import { getFirstLetters } from '../../../app/utils/letterAvatar';
import { DialogService } from 'src/modules/app/services/dialog.service';

@Component({
  selector: 'app-exoft-achievements',
  templateUrl: './exoft-achievements.component.html',
  styleUrls: ['./exoft-achievements.component.scss']
})

export class ExoftAchievementsComponent implements OnInit {

  public wrongAvatarId = '00000000-0000-0000-0000-000000000000';
  public pageData: any = [];
  public letterAvatar = getFirstLetters;
  public numberOfEvents = this.calculateEvents(this.pageData);
  constructor(private requestService: RequestService, private dialogService: DialogService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.requestService.getEvents().subscribe(response => {
      this.pageData = response.data;
    });
  }
  public AvatarId(avatarId: any) {
    return this.requestService.getAvatar(avatarId);
  }

  public calculateEvents(arr: any) {
    return arr.length;
  }

  public openOtherUserInfoDialog(userId: string) {
    this.dialogService.openInfoModal(userId);
  }
}
