import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/dashboardequest.service';
import { MatTableDataSource } from '@angular/material';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public userData: any = [];
  public achievementsData: any = [];
  public userId: any = this.userData.userId;

  constructor(private requestService: RequestService, private dialogService: DialogService) { }
  displayedColumnsUser: string[] = ['firstName', 'lastName', 'xp', 'actions'];
  displayedColumnsAchievements: string[] = ['name', 'description', 'xp', 'actions'];
  dataSourceUser = new MatTableDataSource();
  dataSourceAchievements = new MatTableDataSource();

  ngOnInit() {
    this.loadUserData();
    this.loadAchievementsData();
  }

  private loadUserData() {
    this.requestService.getAllUsers().subscribe(response => {
      this.userData = response.data;
      this.dataSourceUser.data = this.userData;
    });
  }

  private loadAchievementsData() {
    this.requestService.getAllAchievements().subscribe(response => {
      this.achievementsData = response.data;
      this.dataSourceAchievements.data = this.achievementsData;
    });
  }

  public openEditUserWindow() {
    this.dialogService.openEditUserForm();
  }

  public openAddUserWindow()
  {
    this.dialogService.openAddUserForm();
  }
}
