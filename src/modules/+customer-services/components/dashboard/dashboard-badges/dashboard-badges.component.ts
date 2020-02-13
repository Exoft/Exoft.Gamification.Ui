import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UserService} from '../../../../app/services/user.service';


@Component({
  selector: 'app-dashboard-badges',
  templateUrl: './dashboard-badges.component.html',
  styleUrls: ['./dashboard-badges.component.scss']
})
export class DashboardBadgesComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  badgesCount: number;

  constructor(private readonly userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.badgesCount = res.badgesCount;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
