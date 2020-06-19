import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {UserService} from '../../services/user.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {LoadSpinnerService} from '../../services/load-spinner.service';

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.scss']
})
export class ForbiddenPageComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  private navigationLink = ['/'];

  constructor(private router: Router, private readonly userService: UserService, private readonly spinnerService: LoadSpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.userService.getUserData().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (!!res && !!res.roles) {
        this.spinnerService.hideSpinner();
      }

      if (!!res && !!res.roles && res.roles.some(role => role === 'Admin')) {
        this.navigationLink = ['/admin'];
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  navigateToMainPage(): void {
    this.router.navigate(this.navigationLink);
  }
}
