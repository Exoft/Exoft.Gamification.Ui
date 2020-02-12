import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AlertService} from '../../services/alert.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AlertType} from '../../enums/alert-type';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  constructor(private readonly snackBar: MatSnackBar, private readonly alertService: AlertService) {
  }

  ngOnInit() {
    this.subscribeToAlert();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private subscribeToAlert() {
    this.alertService.notify()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        let notificationClass: string;
        if (res.type === AlertType.Success) {
          notificationClass = 'success-notification';
        } else {
          notificationClass = 'error-notification';
        }

        this.snackBar.open(
          res.message,
          'Close',
          {
            duration: 5000,
            panelClass: notificationClass
          }
        );
      });
  }
}
