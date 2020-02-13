import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DashboardService} from '../../../services/dashboard.service';
import {LoadSpinnerService} from '../../../../app/services/load-spinner.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  constructor(private readonly dashboardService: DashboardService,
              private readonly loadSpinnerService: LoadSpinnerService) {
  }

  ngOnInit() {
    this.manageDashboardLoading();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private manageDashboardLoading() {
    this.dashboardService.refreshComponentsStatus();
    this.dashboardService.getComponentsLoadingStatus()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        res ? this.loadSpinnerService.showSpinner() : this.loadSpinnerService.hideSpinner();
      });
  }
}
