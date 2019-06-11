import { Component, OnInit, ViewChild } from '@angular/core';
import { menuItems } from '../../utils/constants';
import {
  Router,
  NavigationEnd,
} from '@angular/router';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent implements OnInit {
  public menuItems = menuItems;
  public isHeaderShown = true;
  @ViewChild('drawer') public drawer;


  public avatarSource =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxOAXqa96ewc_EUYvIjO6oefUTlGg1qo_AMJv7qQQlhP3vns2IA';
  public userName = 'Taras Shevchenko';
  public totalBadgesCount = 30;
  public xpCount = 1334;

  constructor(private router: Router) {}

  ngOnInit() {
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

  public onLogOut() {
    localStorage.removeItem('accessToken');
    this.drawer.close();
    this.router.navigate(['/signin']);
  }
}
