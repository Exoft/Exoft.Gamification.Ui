import {Component, OnInit, OnDestroy} from '@angular/core';
import {RequestService} from 'src/modules/app/services/request.service';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {UserService} from '../../../app/services/user.service';
import {FormGroup} from '@angular/forms';
import {MapperService} from '../../../app/services/mapper.service';
import {AddUserComponent} from '../add-user/add-user.component';
import {AddAchievementComponent} from '../add-achievement/add-achievement.component';
import {Achievement} from '../../../app/models/achievement/achievement';
import {EditAchievementComponent} from '../edit-achievement/edit-achievement.component';
import {AchievementsService} from '../../../app/services/achievements.service';
import {User} from '../../../app/models/user/user';
import {AssignAchievementsComponent} from '../assign-achievements/assign-achievements.component';
import {map, takeUntil} from 'rxjs/operators';
import {ReadAchievementRequest} from '../../../app/models/achievement-request/read-achievement-request';
import {Subject} from 'rxjs';
import {ReadUser} from 'src/modules/app/models/user/read-user';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public userData: ReadUser[] = [];
  public achievementsData: Achievement[] = [];
  public currentUser: FormGroup;
  public isInfoLoaded = false;


  constructor(private requestService: RequestService,
              private userService: UserService,
              private mapperService: MapperService,
              private achievementService: AchievementsService,
              private dialog: MatDialog) {
  }

  displayedColumnsUser: string[] = ['firstName', 'lastName', 'xp', 'actions'];
  displayedColumnsAchievements: string[] = ['name', 'description', 'xp', 'actions'];
  displayedColumnsAchievementsRequests: string[] = ['userName', 'achievement', 'comment', 'actions'];
  dataSourceUser = new MatTableDataSource<ReadUser>();
  dataSourceAchievements = new MatTableDataSource<Achievement>();
  dataSourceAchievementRequest = new MatTableDataSource<ReadAchievementRequest>();

  ngOnInit() {
    this.loadUserData();
    this.loadAchievementsData();
    this.initCurrentUser();
    this.loadAchievementRequests();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadUserData() {
    this.requestService.getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.userData = response.data;
        this.dataSourceUser.data = this.userData;
      });
  }

  private loadAchievementsData() {
    this.requestService.getAllAchievements()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.achievementsData = response.data;
        this.dataSourceAchievements.data = this.achievementsData;
      });
  }

  private loadAchievementRequests() {
    this.requestService.getAllAchievementRequests()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.dataSourceAchievementRequest = new MatTableDataSource(res);
      });
  }

  public onOpenAddUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';

    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadUserData();
      });
  }

  public onOpenEditUser(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.data = id;

    const dialogRef = this.dialog.open(EditUserComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: ReadUser) => {
        if (result) {
          this.dataSourceUser.data[
            this.dataSourceUser.data.indexOf(
              this.dataSourceUser.data.find(x => x.id === result.id))] = result;
          this.dataSourceUser = new MatTableDataSource(this.dataSourceUser.data);
        }
      });
  }

  public onOpenDeleteUser(user: ReadUser) {
    this.userService.deleteUserById(user.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.dataSourceUser = new MatTableDataSource(this.dataSourceUser.data.filter(x => x !== user));
      });
  }

  public onOpenAddAchievement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';

    const dialogRef = this.dialog.open(AddAchievementComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.achievementsData.push(result);
          this.dataSourceAchievements = new MatTableDataSource(this.achievementsData);
        }
      });
  }

  public onOpenEditAchievement(achievement: Achievement) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.data = achievement;

    const dialogRef = this.dialog.open(EditAchievementComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: Achievement) => {
        if (result) {
          this.dataSourceAchievements.data[
            this.dataSourceAchievements.data.indexOf(
              this.dataSourceAchievements.data.find(x => x.id === result.id))] = result;
          this.dataSourceAchievements = new MatTableDataSource(this.dataSourceAchievements.data);
        }
      });
  }

  public onOpenDeleteAchievement(achievement: Achievement) {
    this.achievementService.deleteAchievementById(achievement.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.dataSourceAchievements = new MatTableDataSource(this.dataSourceAchievements.data.filter(x => x !== achievement));
      });
  }

  openAssignAchievementWindow(user: User) {
    this.dialog.open(AssignAchievementsComponent, {
      width: '600px',
      data: user.id
    });
  }

  onRequestDecision(achievementTableRequest: ReadAchievementRequest, isApproved: boolean) {
    if (isApproved) {
      this.requestService.approveAchievementRequest(achievementTableRequest.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.dataSourceAchievementRequest = new MatTableDataSource(this.dataSourceAchievementRequest.data
            .filter(x => x !== achievementTableRequest));
        });
    } else {
      this.requestService.declineAchievementRequest(achievementTableRequest.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.dataSourceAchievementRequest = new MatTableDataSource(this.dataSourceAchievementRequest.data
            .filter(x => x !== achievementTableRequest));
        });
    }
  }

  private initCurrentUser() {
    this.userService.getCurrentUserInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(u => {
        this.currentUser = this.mapperService.getUser(u);
        this.isInfoLoaded = true;
      });
  }
}
