import {Component, Output, EventEmitter, Input} from '@angular/core';
import {menuItems} from '../../utils/constants';
import {getFirstLettersWithSplit} from '../../utils/letterAvatar';
import {OnInit} from '@angular/core/src/metadata/lifecycle_hooks';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { RequestService } from '../../services/dashboardequest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() openSidenavEmitter = new EventEmitter();
  @Input() avatarSource: string;
  @Input() userName: string;
  @Input() firstName: string;
  @Input() lastName: string;
  public menuItems = menuItems;
  public letterAvatar = getFirstLettersWithSplit;

  constructor(private userService: UserService, private authService: AuthService, private requestService: RequestService) {

  }

  ngOnInit(): void {
    // this.userService.getCurrentUserInfo().subscribe((u: User) => {
    //   if (!u.roles.includes('Admin' as never)) {
    //     this.menuItems.pop();
    //   }
    // });
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
