import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { RequestService } from 'src/modules/app/services/dashboardequest.service';
import { getFirstLetters } from '../../utils/letterAvatar';
import { DialogService } from 'src/modules/app/services/dialog.service';
import { GratitudeComponent } from '../gratitude/gratitude.component';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public userId: any
  ) {}

  public totalBadgesCount = 30;

  public pageData;
  public response;
  public achievementsData: any = [];
  public letterAvatar = getFirstLetters;

  ngOnInit() {
    this.loadCurrentUser();
    this.loadAchievements();
  }

  public get currentUserId() {
    return this.userId;
  }

  closeOtherUser(): void {
    this.dialog.closeAll();
  }

  private loadCurrentUser() {
    this.requestService
      .getCurrentUserById(this.currentUserId)
      .subscribe(response => (this.pageData = response));
  }

  private loadAchievements() {
    this.requestService
      .getCurrentUserAchievements(this.currentUserId)
      .subscribe(response => (this.achievementsData = response.data));
  }

  public getAvatarId(avatarId: any) {
    return 'http://localhost:5000/api/files/' + avatarId;
  }

  public openThankYouForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'thank-you-dialog';
    dialogConfig.data = this.userId;

    this.dialog.open(GratitudeComponent, dialogConfig);
  }
}
