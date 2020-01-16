import {Component, OnInit, OnDestroy} from '@angular/core';
import {RequestService} from 'src/modules/app/services/request.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogService} from 'src/modules/app/services/dialog.service';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {UserService} from '../../../app/services/user.service';
import {FormGroup} from '@angular/forms';
import {MapperService} from '../../../app/services/mapper.service';
import {AddUserComponent} from '../add-user/add-user.component';
import {AddAchievementComponent} from '../add-achievement/add-achievement.component';
import {Achievement} from '../../../app/models/achievement';
import {EditAchievementComponent} from '../edit-achievement/edit-achievement.component';
import {AchievementsService} from '../../../app/services/achievements.service';
import {User} from '../../../app/models/user';
import {AssignAchievementsComponent} from '../assign-achievements/assign-achievements.component';
import {map, takeUntil} from 'rxjs/operators';
import {ReadAchievementRequest} from '../../../app/models/achievement-request/read-achievement-request';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public userData: any = [];
  public achievementsData: any = [];
  public userId: any = this.userData.userId;
  public currentUser: FormGroup;
  public isInfoLoaded = false;


  constructor(private requestService: RequestService,
              private userService: UserService,
              private dialogService: DialogService,
              private mapperService: MapperService,
              private achievementService: AchievementsService,
              private dialog: MatDialog) {
  }

  displayedColumnsUser: string[] = ['firstName', 'lastName', 'xp', 'actions'];
  displayedColumnsAchievements: string[] = ['name', 'description', 'xp', 'actions'];
  displayedColumnsAchievementsRequests: string[] = ['userName', 'achievement', 'comment', 'actions'];
  dataSourceUser = new MatTableDataSource();
  dataSourceAchievements = new MatTableDataSource<Achievement>();
  dataSourceAchievementRequest = new MatTableDataSource();

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
    this.requestService.getAllAchievementRequests().pipe(map((data: ReadAchievementRequest[]) => {
      return data.map((achievementRequest: ReadAchievementRequest) => {
        return {
          id: achievementRequest.id,
          userId: achievementRequest.userId,
          userName: achievementRequest.userName,
          achievementId: achievementRequest.achievementId,
          achievement: achievementRequest.achievementName,
          comment: achievementRequest.message
        };
      });
    }))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.dataSourceAchievementRequest = new MatTableDataSource(res);
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
    this.dialog.open(AddUserComponent, {
      width: '600px'
    });
  }

  public onUserDelete(user: User) {
    this.userService.deleteUserById(user.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(u => {
        this.dataSourceUser = new MatTableDataSource(this.dataSourceUser.data.filter(x => x !== user));
      });
  }

  public onOpenAddAchievement() {
    const dialogRef = this.dialog.open(AddAchievementComponent, {
      width: '600px'
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.achievementsData.push(result);
        this.dataSourceAchievements = new MatTableDataSource(this.achievementsData);
      });
  }

  public onOpenEditAchievement(achievement: Achievement) {
    const dialogRef = this.dialog.open(EditAchievementComponent, {
      width: '600px',
      data: {
        achievement
      }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: Achievement) => {
        const achievementToUpdate = this.dataSourceAchievements.data.find(x => x.id === result.id);
        achievementToUpdate.name = result.name;
        achievementToUpdate.icon = result.icon;
        achievementToUpdate.description = result.description;
        achievementToUpdate.xp = result.xp;
        this.dataSourceAchievements.data[
          this.dataSourceAchievements.data.indexOf(
            this.dataSourceAchievements.data.find(x => x.id === result.id))] = achievementToUpdate;
        this.dataSourceAchievements = new MatTableDataSource(this.dataSourceAchievements.data);
      });
  }

  public onAchievementDelete(achievement: Achievement) {
    this.achievementService.deleteAchievementById(achievement.id).subscribe(res => {
      this.dataSourceAchievements = new MatTableDataSource(this.dataSourceAchievements.data.filter(x => x !== achievement));
    });
  }

  openAssignAchievementWindow(user: User) {
    this.dialog.open(AssignAchievementsComponent, {
      width: '600px',
      data: {
        userId: user.id
      }
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
