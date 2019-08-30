import {Component, OnInit} from '@angular/core';
import {RequestService} from 'src/modules/app/services/dashboardequest.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {EditUserComponent} from "./components/edit-user/edit-user.component";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public userData: any = [];
  public achievementsData: any = [];
  public userId: any = this.userData.userId;

  constructor(private requestService: RequestService, private dialogService: DialogService, private dialog: MatDialog) {
  }

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

  public openEditUserWindow(user: any) {
    this.dialog.open(EditUserComponent, {
      width: '600px',
      data: {
        userId: user.id
      }
    });
  }

  public openAddUserWindow() {
    this.dialogService.openAddUserForm();
  }
}
