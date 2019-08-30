import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/modules/app/services/user.service';
import { getFirstLettersWithSplit } from '../../../app/utils/letterAvatar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public avatarSource: string;
  public userName: string;
  public status: string;
  public letterAvatar = getFirstLettersWithSplit;

  constructor(private router: Router, private userService: UserService) { }

  public ngOnInit() {
    this.subscribeToUserDataChange();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToUserDataChange() {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.avatarSource = res.avatarId;
        this.userName = res.firstName + ' ' + res.lastName;
        this.status = res.status;
      });
  }

  public onOpenProfileSettings() {
    this.router.navigate(['/profile-settings']);
  }
  public AvatarId(avatarId: any) {
    return 'http://localhost:5000/api/files/' + avatarId;
  }
}
