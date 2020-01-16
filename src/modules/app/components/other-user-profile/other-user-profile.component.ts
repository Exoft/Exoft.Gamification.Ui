import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {Observable} from 'rxjs';

import {RequestService} from 'src/modules/app/services/request.service';
import {GratitudeComponent} from '../gratitude/gratitude.component';
import {UserService} from '../../services/user.service';
import {getFirstLetters} from '../../utils/letterAvatar';

interface CurrentUserInterface {
  avatarId: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  status: string;
  userName: string;
  xp: number;
  roles: [];
}


@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})

export class OtherUserProfileComponent implements OnInit {
  public totalBadgesCount = 30;
  public achievementsData: any = [];
  private currentUserInfo;
  public currentUser$: Observable<CurrentUserInterface>;
  public letterAvatar = getFirstLetters;

  public get currentUserId(): number {
    return this.userId;
  }

  constructor(
    public dialog: MatDialog,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private userService: UserService
  ) {
  }

  public ngOnInit(): void {
    this.loadCurrentUser();
    this.loadAchievements();

    this.userService.getUserData().subscribe(res => {
      this.currentUserInfo = res;
    });
  }

  closeOtherUser(): void {
    this.dialog.closeAll();
  }

  private loadCurrentUser(): void {
    this.currentUser$ = this.requestService.getCurrentUserById(this.currentUserId);
  }

  private loadAchievements(): void {
    this.requestService
      .getCurrentUserAchievements(this.currentUserId)
      .subscribe(response => {
        this.achievementsData = response.data;
      });
  }

  public getAvatarId(avatarId: string): string {
    return 'https://game-api.exoft.net/api/files/' + avatarId;
  }

  public openThankYouForm(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'thank-you-dialog';
    dialogConfig.data = this.userId;

    this.dialog.open(GratitudeComponent, dialogConfig);
  }

  public isThankYouButtonEnabled(): boolean {
    return !(this.currentUserInfo.id && this.userId === this.currentUserInfo.id);
  }
}
