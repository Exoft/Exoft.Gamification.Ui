import { Component, OnInit } from '@angular/core';
import { menuItems } from 'src/app/utils/constants';
import {
  RouterLinkActive,
  Router,
  NavigationEnd,
  NavigationStart,
  RoutesRecognized
} from '@angular/router';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent implements OnInit {
  public menuItems = menuItems;
  public isHeaderShown = true;

  public avatarSource =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPxOAXqa96ewc_EUYvIjO6oefUTlGg1qo_AMJv7qQQlhP3vns2IA';
  public userName = 'Taras Shevchenko';
  public totalBadgesCount = 30;
  public xpCount = 1334;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      if (
        (e instanceof NavigationEnd ) &&
        (e.url.includes('signin') || e.urlAfterRedirects.includes('page-not-found'))
      ) {
        this.isHeaderShown = false;
      }
    });
  }
}
