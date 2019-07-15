import { Component, Output, EventEmitter, Input } from '@angular/core';
import { menuItems } from '../../utils/constants';
import { getFirstLettersWithSplit } from '../../utils/letterAvatar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() openSidenavEmitter = new EventEmitter();
  @Input() avatarSource: string;
  @Input() userName: string;
  @Input() firstName: string;
  @Input() lastName: string;
  public menuItems = menuItems;
  public letterAvatar = getFirstLettersWithSplit;

  public openSidenav() {
    this.openSidenavEmitter.emit(null);
  }
  public AvatarId(avatarId: any) {
    return 'http://localhost:5000/api/files/' + avatarId;
  }
}
