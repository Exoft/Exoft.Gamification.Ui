import {Component, Output, EventEmitter, Input, OnInit, OnDestroy} from '@angular/core';
import {menuItems} from '../../utils/constants';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {RequestService} from '../../services/request.service';
import {getFirstLettersWithSplit} from '../../utils/letterAvatar';
import {DialogService} from '../../services/dialog.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() openSidenavEmitter = new EventEmitter();
  @Input() avatarSource: string;
  @Input() userName: string;
  @Input() firstName: string;
  @Input() lastName: string;
  private unsubscribe$: Subject<void> = new Subject();
  public menuItems = Array.from(menuItems);
  public letterAvatar = getFirstLettersWithSplit;

  public isUserAdmin = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private requestService: RequestService,
              private readonly dialogService: DialogService) {
  }

  public ngOnInit(): void {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
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

  public openSidenav(): void {
    this.openSidenavEmitter.emit(null);
  }

  public getAvatarLink(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public logOut(): void {
    this.authService.onLogOut();
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
