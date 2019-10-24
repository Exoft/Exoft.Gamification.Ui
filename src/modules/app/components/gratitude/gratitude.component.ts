import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ThankYouService } from '../../services/thank-you.service';

@Component({
  selector: 'app-gratitude',
  templateUrl: './gratitude.component.html',
  styleUrls: ['./gratitude.component.scss']
})
export class GratitudeComponent implements OnInit {
  public message = new FormControl('', Validators.required);

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private userId: any,
    private thankYouService: ThankYouService
  ) {}

  ngOnInit() {}

  public closeForm(): void {
    this.dialog.closeAll();
  }

  public sendMessage(): void {
    if (this.message.valid) {
      this.thankYouService
        .sendThankYouMessage(this.message.value, this.userId)
        .subscribe(res => {
          this.dialog.closeAll();
        });
    }
  }
}
