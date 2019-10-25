import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RequestService } from 'src/modules/app/services/dashboardequest.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
              private httpClient: HttpClient,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadData();
    this.requestAchievementForm = new FormGroup({
      achievementId: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    });
  }

  public onSubmitRequest(formData: FormGroup) {
    this.requestService.requestAchievement(formData.value).subscribe(
    );
    this.dialog.closeAll();
  }

  private loadData() {
    this.requestService.getAllAchievements().subscribe(response => {
      this.pageData = response.data;
    });
  }

  public closeForm(): void {
    this.dialog.closeAll();
  }


}
