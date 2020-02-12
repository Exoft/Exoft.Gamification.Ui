import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

import {ThankYouService} from '../../services/thank-you.service';
import {finalize} from 'rxjs/operators';
import {LoadSpinnerService} from '../../services/load-spinner.service';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-gratitude',
  templateUrl: './gratitude.component.html',
  styleUrls: ['./gratitude.component.scss']
})
export class GratitudeComponent {
  public message = new FormControl('', Validators.required);

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private userId: any,
              private thankYouService: ThankYouService,
              private  readonly loadSpinnerService: LoadSpinnerService,
              private readonly alertService: AlertService) {
  }

  public closeForm(): void {
    this.dialog.closeAll();
  }

  public sendMessage(): void {
    if (this.message.valid) {
      this.loadSpinnerService.showSpinner();
      this.thankYouService
        .sendThankYouMessage(this.message.value, this.userId)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
        .subscribe(res => {
          this.dialog.closeAll();
          this.alertService.success('Gratitude was successfully sent!');
        },
          error => this.alertService.error());
    }
  }
}
