import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';

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

  constructor(private router: Router, private userService: UserService) {}

  public ngOnInit() {
    this.subscribeToUserDataChange();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToUserDataChange() {
    this.userService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.avatarSource = res.userInfo.avatar;
        this.userName = res.userInfo.firstName + ' ' + res.userInfo.lastName;
        this.status = res.userInfo.status;
      });
  }

  public onOpenProfileSettings() {
    this.router.navigate(['/profile-settings']);
  }
}
