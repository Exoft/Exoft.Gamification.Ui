import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OtherUserProfileComponent} from '../components/other-user-profile/other-user-profile.component';
import {RequestAchievementComponent} from '../components/request-achievement/request-achievement.component';
import {EditUserProfileComponent} from '../../shared/components/edit-user-profile/edit-user-profile.component';
import {EditPasswordComponent} from '../../shared/components/edit-password/edit-password.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {
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

  openEditUserProfileDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.autoFocus = false;

    this.dialog.open(EditUserProfileComponent, dialogConfig);
  }

  openEditPasswordDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit-password-dialog';
    dialogConfig.backdropClass = 'edit-password-dialog-backdrop';
    dialogConfig.autoFocus = false;

    this.dialog.open(EditPasswordComponent, dialogConfig);
  }
}
