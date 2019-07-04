import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OtherUserProfileComponent } from '../modules/dashboard/components/other-user-profile/other-user-profile.component';
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

}


