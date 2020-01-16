import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {OtherUserProfileComponent} from '../components/other-user-profile/other-user-profile.component';
import {RequestAchievementComponent} from '../components/request-achievement/request-achievement.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) {
  }

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
}
