import { Component, Output, EventEmitter, Input } from '@angular/core';
import { menuItems } from '../../utils/constants';
import { getFirstLettersWithSplit } from '../../utils/letterAvatar';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { RequestService } from '../../services/dashboardequest.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.menuItems = Array.from(menuItems);
        if (res.roles && !res.roles.includes('Admin')) {
          this.menuItems.pop();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public openSidenav() {
    this.openSidenavEmitter.emit(null);
  }

  public getAvatarLink(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  public logOut(): void {
    this.authService.onLogOut();
  }
}
