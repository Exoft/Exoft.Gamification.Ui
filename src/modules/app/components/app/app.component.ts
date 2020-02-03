import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadSpinnerService} from '../../services/load-spinner.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  isDataLoading = false;

  constructor(private readonly loadSpinnerService: LoadSpinnerService) {
  }

  ngOnInit() {
    this.subscribeToSpinnerStatusChange();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private subscribeToSpinnerStatusChange() {
    this.loadSpinnerService.getSpinnerStatus().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.isDataLoading = res;
    });
  }
}
