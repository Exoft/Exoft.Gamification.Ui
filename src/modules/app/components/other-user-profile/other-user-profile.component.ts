import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {forkJoin} from 'rxjs';

import {RequestService} from 'src/modules/app/services/request.service';
import {GratitudeComponent} from '../gratitude/gratitude.component';
import {UserService} from '../../services/user.service';
import {getFirstLetters} from '../../utils/letterAvatar';
import {User} from '../../models/user/user';
import {Achievement} from '../../models/achievement/achievement';
import {finalize} from 'rxjs/operators';
import {LoadSpinnerService} from '../../services/load-spinner.service';
import {AlertService} from '../../services/alert.service';
import {ReadAchievementRequest} from '../../models/achievement-request/read-achievement-request';
import {UserAchievement} from '../../models/achievement/user-achievement';

export interface AchievementWithShortInfo {
  achievementId: string;
  iconId: string;
  name: string;
  count: number;
}

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit, OnDestroy {
  private dialogRef: MatDialogRef<any>;
  private currentUserId: string;

  letterAvatar = getFirstLetters;

  userInfo: User;
  achievements: AchievementWithShortInfo[] = [];

  constructor(
    public dialog: MatDialog,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public userId: string,
    private userService: UserService,
    private readonly loadSpinnerService: LoadSpinnerService,
    private readonly alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.loadData();
    this.loadCurrentUserData();
  }

  ngOnDestroy() {
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private loadData() {
    const requests = [
      this.requestService.getCurrentUserById(this.userId),
      this.requestService.getCurrentUserAchievements(this.userId)
    ];

    this.loadSpinnerService.showSpinner();
    forkJoin(requests)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(
        res => {
          this.userInfo = res[0];
          this.setAchievementsWithShortInfoArray(res[1].data);
        },
        error => this.alertService.error()
      );
  }

  private loadCurrentUserData() {
    this.userService.getUserData().subscribe(res => {
      this.currentUserId = res.id;
    });
  }

  private setAchievementsWithShortInfoArray(achievements: UserAchievement[]) {
    achievements.forEach(inputAchievement => {
      const achievementIndex = this.achievements.findIndex(
        achievement => achievement.achievementId === inputAchievement.achievementId
      );

      if (achievementIndex !== -1) {
        this.achievements[achievementIndex].count++;
      } else {
        const achievementToPush: AchievementWithShortInfo = {
          achievementId: inputAchievement.achievementId,
          iconId: inputAchievement.iconId,
          name: inputAchievement.name,
          count: 1
        };
        this.achievements.push(achievementToPush);
      }
    });
  }

  getAvatarId(avatarId: string) {
    return this.userService.getAvatarUrl(avatarId);
  }

  openThankYouForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'thank-you-dialog';
    dialogConfig.data = this.userId;

    this.dialogRef = this.dialog.open(GratitudeComponent, dialogConfig);
  }

  isThankYouButtonEnabled(): boolean {
    return !(this.currentUserId && this.userId === this.currentUserId);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
