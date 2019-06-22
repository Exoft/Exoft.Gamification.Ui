import { Component, Output, EventEmitter, Input } from '@angular/core';
import { menuItems } from '../../utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() openSidenavEmitter = new EventEmitter();
  @Input() avatarSource: string;
  @Input() userName: string;
  public menuItems = menuItems;

  public openSidenav() {
    this.openSidenavEmitter.emit(null);
  }
}
