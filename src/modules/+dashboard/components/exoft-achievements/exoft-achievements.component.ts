import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RequestService } from 'src/modules/app/services/dashboardequest.service';
import { getFirstLetters } from '../../../app/utils/letterAvatar';

@Component({
  selector: 'app-exoft-achievements',
  templateUrl: './exoft-achievements.component.html',
  styleUrls: ['./exoft-achievements.component.scss']
})

export class ExoftAchievementsComponent implements OnInit {

  public pageData: any = [];
  public letterAvatar = getFirstLetters;
  public numberOfEvents = this.calculateEvents(this.pageData);
  constructor(public dialog: MatDialog, private requestService: RequestService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.requestService.getEvents().subscribe(response => {
      this.pageData = response.data;
    });
  }
  public AvatarId(avatarId: any) {
    return 'http://localhost:5000/api/files/' + avatarId;
  }

  public calculateEvents(arr: any) {
    return arr.length;
  }

}
