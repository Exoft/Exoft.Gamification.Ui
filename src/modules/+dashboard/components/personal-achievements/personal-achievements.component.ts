import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/modules/app/services/dashboardequest.service';
import { MatDialog } from '@angular/material';
import { DialogService } from 'src/modules/app/services/dialog.service';
import { AssignAchievementsComponent } from '../../../+admin-page/components/assign-achievements/assign-achievements.component';
import { RequestAchievementComponent } from '../../../app/components/request-achievement/request-achievement.component';

@Component({
  selector: 'app-personal-achievements',
  templateUrl: './personal-achievements.component.html',
  styleUrls: ['./personal-achievements.component.scss']
})
export class PersonalAchievementsComponent implements OnInit {
  public pageData: any = [];
  public response: any = [];

  constructor(
    private requestService: RequestService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.requestService.getAchievementsInfo(1, 4).subscribe(response => {
      this.pageData = response.data;
    });
  }

  public IconId(iconId: any) {
    return 'http://localhost:5000/api/files/' + iconId;
  }

  public openForm() {
    this.dialogService.openRequestForm();
  }
}
