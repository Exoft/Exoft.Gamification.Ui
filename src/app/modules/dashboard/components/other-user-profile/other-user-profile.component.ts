import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { RequestService } from 'src/app/services/dashboardequest.service';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {

  constructor(public dialog: MatDialog, private requestService: RequestService,
              @Inject(MAT_DIALOG_DATA) public userId: any) { }

  public totalBadgesCount = 30;

  public pageData;
  public response;
  public achievementsData: any = [];

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
    this.requestService.getCurrentUserById(this.currentUserId).subscribe(response =>
      this.pageData = response);
  }

  private loadAchievements() {
    this.requestService.getCurrentUserAchievements(this.currentUserId).subscribe(response =>
      this.achievementsData = response.data);
  }

  public getAvatarId(avatarId: any) {
    return 'http://localhost:5000/api/files/' + avatarId;
  }

}



