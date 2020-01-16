import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {RequestService} from 'src/modules/app/services/request.service';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {getFirstLetters} from '../../../app/utils/letterAvatar';


@Component({
  selector: 'app-top-chart',
  templateUrl: './top-chart.component.html',
  styleUrls: ['./top-chart.component.scss']
})
export class TopChartComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private requestService: RequestService,
              private dialogService: DialogService) {
  }

  public pageData: any = [];
  public title = 'Gamification';
  public maxXp: number;
  public letterAvatar = getFirstLetters;

  public ngOnInit(): void {
    this.loadData();
  }

  public getMaxXp(xp: number): void {
    this.maxXp = xp;
  }

  public getXpValue(value: number): number {
    return (value * 100) / this.pageData[0].xp;
  }

  public openUserDetails(userId: any): void {
    this.dialogService.openInfoModal(userId);
  }

  public getAvatarId(avatarId: any): string {
    return this.requestService.getAvatar(avatarId);
  }

  private loadData(): void {
    this.requestService.getAllUsers().subscribe(response => {
      // Take top five users
      this.pageData = response.data.sort((a, b) => b.xp - a.xp).slice(0, 5);
      this.getMaxXp(this.pageData[0].xp);
    });
  }
}
