import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {RequestService} from 'src/modules/app/services/request.service';
import {finalize} from 'rxjs/operators';
import {LoadSpinnerService} from '../../services/load-spinner.service';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-request-achievement',
  templateUrl: './request-achievement.component.html',
  styleUrls: ['./request-achievement.component.scss']
})
export class RequestAchievementComponent implements OnInit {
  public pageData: any;
  public requestAchievementForm: FormGroup;

  constructor(public dialog: MatDialog,
              public requestService: RequestService,
              private readonly  loadSpinnerService: LoadSpinnerService,
              private readonly alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.loadData();
    this.requestAchievementForm = new FormGroup({
      achievementId: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    });
  }

  public onSubmitRequest(formData: FormGroup): void {
    this.loadSpinnerService.showSpinner();
    this.requestService.requestAchievement(formData.value)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(
        res => {
          this.dialog.closeAll();
          this.alertService.success('Achievement was successfully requested!');
        },
        error => this.alertService.error()
      );
  }

  private loadData(): void {
    this.loadSpinnerService.showSpinner();
    this.requestService.getAllAchievements()
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(response => {
        this.pageData = response.data;
      },
        error => this.alertService.error());
  }

  public closeForm(): void {
    this.dialog.closeAll();
  }


}
