import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BadgesService} from '../../../services/badges.service';
import {LoadSpinnerService} from '../../../../app/services/load-spinner.service';


@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  constructor(private readonly badgesService: BadgesService,
              private readonly loadSpinnerService: LoadSpinnerService) {
  }

  ngOnInit() {
    this.manageBadgesLoading();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private manageBadgesLoading() {
    this.badgesService.refreshComponentsStatus();
    this.badgesService.getComponentsLoadingStatus()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        res ? this.loadSpinnerService.showSpinner() : this.loadSpinnerService.hideSpinner();
      });
  }
}
