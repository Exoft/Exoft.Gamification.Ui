import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AchievementRequestWithDetails} from '../../../app/models/achievement-request/achievement-request-with-details';
import {finalize} from 'rxjs/operators';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';
import {RequestService} from '../../../app/services/request.service';

@Component({
  selector: 'app-achievements-requests',
  templateUrl: './achievements-requests.component.html',
  styleUrls: ['./achievements-requests.component.scss']
})
export class AchievementsRequestsComponent implements OnInit {
  displayedColumnsAchievementsRequests: string[] = ['userName', 'achievement', 'comment', 'actions'];
  dataSourceAchievementRequest = new MatTableDataSource<AchievementRequestWithDetails>();

  constructor(private readonly spinnerService: LoadSpinnerService,
              private readonly alertService: AlertService,
              private readonly requestService: RequestService) {
  }

  ngOnInit() {
    this.loadRequestAchievementsData();
  }

  private loadRequestAchievementsData() {
    this.spinnerService.showSpinner();
    this.requestService.getAllAchievementRequests()
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.dataSourceAchievementRequest = new MatTableDataSource(res);
        },
        error => this.alertService.error());
  }

  onRequestDecision(achievementTableRequest: AchievementRequestWithDetails, isApproved: boolean) {
    this.spinnerService.showSpinner();
    if (isApproved) {
      this.requestService.approveAchievementRequest(achievementTableRequest.id)
        .pipe(finalize(() => this.spinnerService.hideSpinner()))
        .subscribe(res => {
            this.dataSourceAchievementRequest = new MatTableDataSource(this.dataSourceAchievementRequest.data
              .filter(x => x !== achievementTableRequest));
            this.alertService.success('Achievement request was approved!');
          },
          error => this.alertService.error());
    } else {
      this.requestService.declineAchievementRequest(achievementTableRequest.id)
        .pipe(finalize(() => this.spinnerService.hideSpinner()))
        .subscribe(res => {
            this.dataSourceAchievementRequest = new MatTableDataSource(this.dataSourceAchievementRequest.data
              .filter(x => x !== achievementTableRequest));
            this.alertService.success('Achievement request was declined!');
          },
          error => this.alertService.error());
    }
  }
}
