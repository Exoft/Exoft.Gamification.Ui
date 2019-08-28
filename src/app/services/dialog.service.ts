import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OtherUserProfileComponent } from '../modules/dashboard/components/other-user-profile/other-user-profile.component';
import { GratitudeComponent } from '../modules/dashboard/components/gratitude/gratitude.component';
import { RequestAchievementComponent } from '../modules/dashboard/components/request-achievement/request-achievement.component';
import { AddUserComponent } from '../modules/admin-page/components/add-user/add-user.component';
import { ProfileSettingsComponent } from '../modules/profile-settings/profile-settings.component';
import { EditUserComponent } from '../modules/admin-page/components/edit-user/edit-user.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  public openInfoModal(userId: any) {
    this.dialog.open(OtherUserProfileComponent, {
      width: '680px',
      height: '680px',
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

  public openEditUserForm() {
    this.dialog.open(AddUserComponent, {
      width: '600px'
    });
  }

  public openAddUserForm() {
    this.dialog.open(EditUserComponent, {
      width: '600px'
    });
  }

}


