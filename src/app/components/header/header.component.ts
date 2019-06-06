import { Component, Output, EventEmitter } from '@angular/core';
import { menuItems} from '../../utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuItems = menuItems;
  public avatarSource = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxOAXqa96ewc_EUYvIjO6oefUTlGg1qo_AMJv7qQQlhP3vns2IA';
  public userName = 'Taras Shevchenko';
  @Output() openSidenavEmitter = new EventEmitter();

  openSidenav() {
    this.openSidenavEmitter.emit(null);
  }

  constructor() {}
}
