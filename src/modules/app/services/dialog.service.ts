import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OtherUserProfileComponent } from '../components/other-user-profile/other-user-profile.component';
import { GratitudeComponent } from '../components/gratitude/gratitude.component';
import { RequestAchievementComponent } from '../components/request-achievement/request-achievement.component';
import { AddUserComponent } from '../../+admin-page/components/add-user/add-user.component';
import { EditUserComponent } from '../../+admin-page/components/edit-user/edit-user.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  public openInfoModal(userId: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'other-user-dialog';
    dialogConfig.data = userId;

    this.dialog.open(OtherUserProfileComponent, dialogConfig);
  }

  public openRequestForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'request-dialog';

    this.dialog.open(RequestAchievementComponent, dialogConfig);
  }

  public openEditUserForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit-user-dialog';

    this.dialog.open(EditUserComponent, dialogConfig);
  }

  public openAddUserForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'add-user-dialog';

    this.dialog.open(AddUserComponent, dialogConfig);
  }
}
