import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from '../../../app/services/user.service';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit, OnDestroy {
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
