import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';
import { forkJoin } from 'rxjs';

import { RequestService } from 'src/modules/app/services/request.service';
import { GratitudeComponent } from '../gratitude/gratitude.component';
import { UserService } from '../../services/user.service';
import { getFirstLetters } from '../../utils/letterAvatar';
import { User } from '../../models/user/user';
import { Achievement } from '../../models/achievement/achievement';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {
  private currentUserId: string;

  letterAvatar = getFirstLetters;

  userInfo: User;
  achievements: Achievement[] = [];

  constructor(
    public dialog: MatDialog,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public userId: string,
    private userService: UserService,
    private readonly notification: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadCurrentUserData();
  }

  private loadData() {
    const requests = [
      this.requestService.getCurrentUserById(this.userId),
      this.requestService.getCurrentUserAchievements(this.userId)
    ];

    forkJoin(requests).subscribe(
      res => {
        this.userInfo = res[0];
        this.achievements = res[1].data;
      },
      error => {
        this.notification.open(
          'An error occurred while data loading!',
          'Close',
          { duration: 5000 }
        );
      }
    );
  }

  private loadCurrentUserData() {
    this.userService.getUserData().subscribe(res => {
      this.currentUserId = res.id;
    });
  }

  getAvatarId(avatarId: string) {
    return this.userService.getAvatarUrl(avatarId);
  }

  openThankYouForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'thank-you-dialog';
    dialogConfig.data = this.userId;

    this.dialog.open(GratitudeComponent, dialogConfig);
  }

  isThankYouButtonEnabled(): boolean {
    return !(this.currentUserId && this.userId === this.currentUserId);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
