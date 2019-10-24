import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/modules/app/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  public pageData: any = [];
  public response: any = [];
  public welcomeGreeting = this.getWelcomeGreeting();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
    let greeting: string;
    if (currentTimeHours >= 12 && currentTimeHours < 18) {
      return (greeting = 'Good day');
    }
    if (currentTimeHours >= 18 && currentTimeHours < 24) {
      return (greeting = 'Good evening');
    }
    if (currentTimeHours >= 5 && currentTimeHours < 12) {
      return (greeting = 'Good morning');
    } else {
      return (greeting = 'Good night');
    }
  }
}
