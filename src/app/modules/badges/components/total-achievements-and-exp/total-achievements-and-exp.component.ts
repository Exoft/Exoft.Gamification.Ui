import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-total-achievements-and-exp',
  templateUrl: './total-achievements-and-exp.component.html',
  styleUrls: ['./total-achievements-and-exp.component.scss']
})
export class TotalAchievementsAndExpComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public badgesCount = '50';
  public experienceCount: number;
  public avarageCount = '21';
  public newBadgesCount = '5';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscribeToUserDataChange();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToUserDataChange() {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.experienceCount = res.xp;
      });
  }
}
