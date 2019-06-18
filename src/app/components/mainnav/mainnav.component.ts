import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { menuItems } from '../../utils/constants';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDrawer } from '@angular/material';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') public drawer: MatDrawer;
  private unsubscribe$: Subject<void> = new Subject();

  public menuItems = menuItems;
  public isHeaderShown = true;
  public avatarSource: string;
  public userName: string;
  public totalBadgesCount = 30;
  public xpCount = 1334;

  constructor(private router: Router, private userService: UserService) {}

  public ngOnInit() {
    this.getUser();
    this.subscribeToEvents();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToEvents() {
    this.subscribeToUserDataChange();
    this.subscribeToRouteChange();
  }

  private subscribeToUserDataChange() {
    this.userService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.avatarSource = res.userInfo.avatar;
        this.userName = res.userInfo.firstName + ' ' + res.userInfo.lastName;
      });
  }

  private subscribeToRouteChange() {
    this.router.events.subscribe((e: any) => {
      if (
        e instanceof NavigationEnd &&
        (e.urlAfterRedirects.includes('signin') ||
          e.urlAfterRedirects.includes('page-not-found'))
      ) {
        this.isHeaderShown = false;
      } else if (e instanceof NavigationEnd) {
        this.isHeaderShown = true;
      }
    });
  }

  public getUser() {
    this.userService.getUserInfo('1').subscribe(res => {
      const {
        avatar,
        userName,
        firstName,
        lastName,
        emailAddress,
        status
      } = res.body;
      this.userService.setUser({
        avatar,
        userName,
        firstName,
        lastName,
        emailAddress,
        status
      });
    });
  }

  public onLogOut() {
    localStorage.removeItem('accessToken');
    this.drawer.close();
    this.router.navigate(['/signin']);
  }
}
