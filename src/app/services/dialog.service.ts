import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OtherUserProfileComponent } from '../modules/dashboard/components/other-user-profile/other-user-profile.component';
import { GratitudeComponent } from '../modules/dashboard/components/gratitude/gratitude.component';
import { RequestAchievementComponent } from '../modules/dashboard/components/request-achievement/request-achievement.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  public openInfoModal(userId: any) {
    this.dialog.open(OtherUserProfileComponent, {
      width: '1000px',
      data: userId
    });
  }

  public openRequestForm() {
    this.dialog.open(RequestAchievementComponent, {
      width: '500px'
    });
  }

  public openThankingForm() {
    this.dialog.open(GratitudeComponent, {
      width: '600px'
    });
  }

}


