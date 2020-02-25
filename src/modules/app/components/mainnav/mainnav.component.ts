import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {menuItems} from '../../utils/constants';
import {Router, NavigationEnd} from '@angular/router';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {MatDrawer} from '@angular/material/sidenav';

import {UserService} from 'src/modules/app/services/user.service';
import {AuthService} from 'src/modules/app/services/auth.service';
import {RequestService} from '../../services/request.service';
import {environment} from 'src/environments/environment';
import {getFirstLettersWithSplit} from '../../utils/letterAvatar';
import {LoadSpinnerService} from '../../services/load-spinner.service';
import {AlertService} from '../../services/alert.service';
import {DialogService} from '../../services/dialog.service';


@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', {static: true}) public drawer: MatDrawer;

  private unsubscribe$: Subject<void> = new Subject();

  public menuItems = Array.from(menuItems);
  public isHeaderShown = true;
  public avatarSource: string;
  public userName: string;
  public xpCount: number;
  public totalBadgesCount: number;
  public userData: any;
  public firstName: any;
  public lastName: any;
  public letterAvatar = getFirstLettersWithSplit;
  public userRoles: any = [];

  public isUserAdmin = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private requestService: RequestService,
    private readonly loadSpinnerService: LoadSpinnerService,
    private readonly alertService: AlertService,
    private readonly dialogService: DialogService
  ) {
  }

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
        this.totalBadgesCount = res.badgesCount;

        this.menuItems = Array.from(menuItems);
        if (res.roles && !res.roles.includes('Admin')) {
          this.menuItems.splice(2, 3);
          this.isUserAdmin = false;
        } else {
          this.menuItems.splice(0, 2);
          this.isUserAdmin = true;
        }
      });
  }

  public logOut(): void {
    this.drawer.close();
    return this.authService.onLogOut();
  }

  private subscribeToRouteChange(): void {
    this.router.events.subscribe((res: any) => {
      if (
        res instanceof NavigationEnd &&
        (res.urlAfterRedirects.includes('sign-in') ||
          res.urlAfterRedirects.includes('page-not-found') ||
          res.urlAfterRedirects.includes('forbidden'))
      ) {
        this.isHeaderShown = false;
      } else if (res instanceof NavigationEnd) {
        this.isHeaderShown = true;
      }
    });
  }

  public getUser(): void {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      this.loadSpinnerService.showSpinner();
      this.userService.getCurrentUserInfo()
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
        .subscribe(res => {
            this.userData = {...res};
            this.userData.avatar =
              environment.apiUrl + '/api/files/' + this.userData.avatarId;
            this.userService.setUserData(this.userData);
          },
          error => this.alertService.error());
    }
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openEditProfileDialog() {
    this.dialogService.openEditUserProfileDialog();
  }

  openChangePasswordDialog() {
    this.dialogService.openEditPasswordDialog();
  }
}
