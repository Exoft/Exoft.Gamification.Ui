import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RequestService } from 'src/app/services/dashboardequest.service';

@Component({
  selector: 'app-gratitude',
  templateUrl: './gratitude.component.html',
  styleUrls: ['./gratitude.component.scss']
})
export class GratitudeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
 
  ngOnInit() {
  }

  public closeForm(): void {
    this.dialog.closeAll();
  }
}
