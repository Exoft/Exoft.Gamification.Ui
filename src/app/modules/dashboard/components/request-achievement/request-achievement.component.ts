import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RequestService } from 'src/app/services/dashboardequest.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-request-achievement',
  templateUrl: './request-achievement.component.html',
  styleUrls: ['./request-achievement.component.scss']
})
export class RequestAchievementComponent implements OnInit {
  constructor(public dialog: MatDialog,
    public requestService: RequestService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder) { }
  public pageData: any;
  public requestAchievementForm: FormGroup;


  ngOnInit() {
    this.loadData();
    this.requestAchievementForm = new FormGroup({
      'name': new FormControl('1 year', Validators.required),
      'message': new FormControl(null)
    });
  }

 public onSubmitRequest(formData: FormGroup) {
    this.requestService.requestAchievement(formData.value);
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
