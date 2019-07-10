import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RequestService } from 'src/app/services/dashboardequest.service';
import { DialogService } from 'src/app/services/dialog.service';
import {getFirstLetters} from '../../../../utils/letterAvatar';

@Component({
  selector: 'app-top-chart',
  templateUrl: './top-chart.component.html',
  styleUrls: ['./top-chart.component.scss']
})
export class TopChartComponent implements OnInit {
  constructor(public dialog: MatDialog,
    private requestService: RequestService,
    private dialogService: DialogService) { }
  public pageData: any = [];
  public title = 'Gamification';
  public BarChart = [];
  public response: any = [];
  public maxXp: number;
  public xpValue: number;
  public letterAvatar = getFirstLetters;
  ngOnInit() {
    this.loadData();

  }

  private loadData() {
    this.requestService.getAllUsers().subscribe(response => {
      this.pageData = response.data;
      this.getMaxXp(this.pageData[0].xp);
    });
  }

  public getMaxXp(xp: number) {
    this.maxXp = xp;
  }

  public getXpValue(value: number) {
    return (value * 100) / this.pageData[0].xp;
  }

  public openUserDetails(userId: any) {
    this.dialogService.openInfoModal(userId);
  }

  public AvatarId(avatarId: any) {
    return 'http://localhost:5000/api/files/' + avatarId;
  }

}
