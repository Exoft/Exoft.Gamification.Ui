import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {UserService} from 'src/modules/app/services/user.service';
import {RequestService} from 'src/modules/app/services/request.service';
import {getFirstLettersWithSplit} from '../../../app/utils/letterAvatar';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private dialogRef: MatDialogRef<any>;

  public avatarSource: string;
  public userName: string;
  public status: string;
  public letterAvatar = getFirstLettersWithSplit;

  constructor(private router: Router,
              private userService: UserService,
              private requestService: RequestService,
              private readonly dialogService: DialogService) {
  }

  public ngOnInit(): void {
    this.subscribeToUserDataChange();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private subscribeToUserDataChange(): void {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.avatarSource = res.avatarId;
        this.userName = res.firstName + ' ' + res.lastName;
        this.status = res.status;
      });
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  openEditUserProfileDialog() {
    this.dialogRef = this.dialogService.openEditUserProfileDialog();
  }
}
