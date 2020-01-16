import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {RequestService} from 'src/modules/app/services/request.service';


@Component({
  selector: 'app-request-achievement',
  templateUrl: './request-achievement.component.html',
  styleUrls: ['./request-achievement.component.scss']
})
export class RequestAchievementComponent implements OnInit {

  public pageData: any;
  public requestAchievementForm: FormGroup;

  constructor(public dialog: MatDialog, public requestService: RequestService) {
  }

  public ngOnInit(): void {
    this.loadData();
    this.requestAchievementForm = new FormGroup({
      achievementId: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    });
  }

  public onSubmitRequest(formData: FormGroup): void {
    this.requestService.requestAchievement(formData.value).subscribe(
    );
    this.dialog.closeAll();
  }

  private loadData(): void {
    this.requestService.getAllAchievements().subscribe(response => {
      this.pageData = response.data;
    });
  }

  public closeForm(): void {
    this.dialog.closeAll();
  }


}
