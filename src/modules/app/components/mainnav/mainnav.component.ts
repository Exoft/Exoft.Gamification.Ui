import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { menuItems } from '../../utils/constants';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDrawer } from '@angular/material';

import { UserService } from 'src/modules/app/services/user.service';
import { AuthService } from 'src/modules/app/services/auth/auth.service';
import { RequestService } from '../../services/dashboardequest.service';
import { environment } from 'src/environments/environment';
import { getFirstLettersWithSplit } from '../../utils/letterAvatar';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') public drawer: MatDrawer;

  private unsubscribe$: Subject<void> = new Subject();

  public menuItems = Array.from(menuItems);
  public isHeaderShown = true;
  public avatarSource: string;
  public userName: string;
  public xpCount: number;
  public totalBadgesCount = 30;
  public userData: any;
  public firstName: any;
  public lastName: any;
  public letterAvatar = getFirstLettersWithSplit;
  public userRoles: any = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private requestService: RequestService
  ) {}

  public ngOnInit(): void {
    this.getUser();
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    this.subscribeToUserDataChange();
    this.subscribeToRouteChange();
  }

  private subscribeToUserDataChange(): void {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.avatarSource = res.avatarId;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.userName = res.firstName + ' ' + res.lastName;
        this.xpCount = res.xp;
        this.userRoles = res.roles;

        this.menuItems = Array.from(menuItems);
        if (res.roles && !res.roles.includes('Admin')) {
          this.menuItems.pop();
        }
      });
  }
  public logOut(): void {
    this.drawer.close();
    return this.authService.onLogOut();
  }

  private subscribeToRouteChange(): void {
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

  public getUser(): void {
    this.userService.getCurrentUserInfo().subscribe(res => {
      this.userData = { ...res };
      this.userData.avatar =
        environment.apiUrl + '/api/files/' + this.userData.avatarId;
      this.userService.setUserData(this.userData);
    });
  }
  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
