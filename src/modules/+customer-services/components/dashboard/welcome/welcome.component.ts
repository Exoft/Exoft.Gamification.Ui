import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {UserService} from 'src/modules/app/services/user.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public pageData: any = [];
  public welcomeGreeting = this.getWelcomeGreeting();

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.pageData = res;
      });
  }

  public getWelcomeGreeting(): string {
    const currentTime: Date = new Date();
    const currentTimeHours = currentTime.getHours();
    if (currentTimeHours >= 12 && currentTimeHours < 18) {
      return 'Good day';
    }
    if (currentTimeHours >= 18 && currentTimeHours < 24) {
      return 'Good evening';
    }
    if (currentTimeHours >= 5 && currentTimeHours < 12) {
      return 'Good morning';
    } else {
      return 'Good night';
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
