import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {RequestService} from 'src/modules/app/services/request.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {UserService} from '../../../app/services/user.service';
import {FormGroup, FormControl} from '@angular/forms';
import {MapperService} from '../../../app/services/mapper.service';
import {AddUserComponent} from '../add-user/add-user.component';
import {AddAchievementComponent} from '../add-achievement/add-achievement.component';
import {Achievement} from '../../../app/models/achievement/achievement';
import {EditAchievementComponent} from '../edit-achievement/edit-achievement.component';
import {AchievementsService} from '../../../app/services/achievements.service';
import {User} from '../../../app/models/user/user';
import {AssignAchievementsComponent} from '../assign-achievements/assign-achievements.component';
import {finalize, takeUntil} from 'rxjs/operators';
import {ReadAchievementRequest} from '../../../app/models/achievement-request/read-achievement-request';
import {Subject} from 'rxjs';
import {ReadUser} from 'src/modules/app/models/user/read-user';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {MatPaginator, MatTabChangeEvent} from '@angular/material';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  @ViewChild('userPaginator', {static: true}) userPaginator: MatPaginator;
  @ViewChild('achievementPaginator', {static: true}) achievementPaginator: MatPaginator;

  private unsubscribe$: Subject<void> = new Subject();
  private dialogRef: MatDialogRef<any>;

  public userData: ReadUser[] = [];
  public achievementsData: Achievement[] = [];
  public currentUser: FormGroup;
  public isInfoLoaded = false;

  public letterAvatar = getFirstLetters;

  paginatorPageSizeOptions: number[] = [5, 10, 20, 50];

  displayedColumnsUser: string[] = ['avatar', 'firstName', 'lastName', 'xp', 'actions'];
  dataSourceUser = new MatTableDataSource<ReadUser>();
  userPaginatorTotalItems = 0;
  userFilterForm = new FormGroup({
    page: new FormControl(1),
    limit: new FormControl(20)
  });

  displayedColumnsAchievements: string[] = ['icon', 'name', 'description', 'xp', 'actions'];
  dataSourceAchievements = new MatTableDataSource<Achievement>();
  achievementPaginatorTotalItems = 0;
  achievementFilterForm = new FormGroup({
    page: new FormControl(1),
    limit: new FormControl(20)
  });

  displayedColumnsAchievementsRequests: string[] = ['userName', 'achievement', 'comment', 'actions'];
  dataSourceAchievementRequest = new MatTableDataSource<ReadAchievementRequest>();

  constructor(private requestService: RequestService,
              private userService: UserService,
              private mapperService: MapperService,
              private achievementService: AchievementsService,
              private dialog: MatDialog,
              private readonly loadSpinnerService: LoadSpinnerService,
              private readonly alertService: AlertService) {
  }

  ngOnInit() {
    this.loadUserData();
    this.initCurrentUser();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (!!this.dialogRef) {
      this.dialogRef.close();
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

  private loadRequestAchievementsData() {
    this.loadSpinnerService.showSpinner();
    this.requestService.getAllAchievementRequests()
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(res => {
        this.dataSourceAchievementRequest = new MatTableDataSource(res);
      });
  }

  onAdminTabChange(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.loadUserData();
    } else if (event.index === 1) {
      this.loadAchievementsData();
    } else {
      this.loadRequestAchievementsData();
    }
  }

  loadUserData() {
    const currentPage = this.userFilterForm.get('page').value;
    const pageSize = this.userFilterForm.get('limit').value;

    this.loadSpinnerService.showSpinner();
    this.requestService.getAllUsers(currentPage, pageSize)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(response => {
          this.userData = response.data;
          this.dataSourceUser.data = this.userData;
          this.userPaginatorTotalItems = response.totalItems;
        },
        error => this.alertService.error());
  }

  loadAchievementsData() {
    const currentPage = this.achievementFilterForm.get('page').value;
    const pageSize = this.achievementFilterForm.get('limit').value;

    this.loadSpinnerService.showSpinner();
    this.requestService.getAllAchievements(currentPage, pageSize)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(response => {
          this.achievementsData = response.data;
          this.dataSourceAchievements.data = this.achievementsData;
          this.achievementPaginatorTotalItems = response.totalItems;
        },
        error => this.alertService.error());
  }

  onOpenAddUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';

    this.dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadUserData();
      });
  }

  onOpenEditUser(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.data = id;

    this.dialogRef = this.dialog.open(EditUserComponent, dialogConfig);
    this.dialogRef.afterClosed()
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

  onOpenDeleteUser(user: ReadUser) {
    this.loadSpinnerService.showSpinner();
    this.userService.deleteUserById(user.id)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(res => {
          this.dataSourceUser = new MatTableDataSource(this.dataSourceUser.data.filter(x => x !== user));
          this.alertService.success('User was successfully deleted!');
        },
        error => this.alertService.error());
  }

  onOpenAddAchievement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';

    this.dialogRef = this.dialog.open(AddAchievementComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.achievementsData.push(result);
          this.dataSourceAchievements = new MatTableDataSource(this.achievementsData);
        }
      });
  }

  onOpenEditAchievement(achievement: Achievement) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.data = achievement;

    this.dialogRef = this.dialog.open(EditAchievementComponent, dialogConfig);
    this.dialogRef.afterClosed()
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

  onOpenDeleteAchievement(achievement: Achievement) {
    this.loadSpinnerService.showSpinner();
    this.achievementService.deleteAchievementById(achievement.id)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(res => {
          this.dataSourceAchievements = new MatTableDataSource(this.dataSourceAchievements.data.filter(x => x !== achievement));
          this.alertService.success('Achievement was successfully deleted!');
        },
        error => this.alertService.error());
  }

  openAssignAchievementWindow(user: User) {
    this.dialogRef = this.dialog.open(AssignAchievementsComponent, {
      width: '600px',
      data: user.id
    });
  }

  onRequestDecision(achievementTableRequest: ReadAchievementRequest, isApproved: boolean) {
    this.loadSpinnerService.showSpinner();
    if (isApproved) {
      this.requestService.approveAchievementRequest(achievementTableRequest.id)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.dataSourceAchievementRequest = new MatTableDataSource(this.dataSourceAchievementRequest.data
              .filter(x => x !== achievementTableRequest));
            this.alertService.success('Achievement request was approved!');
          },
          error => this.alertService.error());
    } else {
      this.requestService.declineAchievementRequest(achievementTableRequest.id)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.dataSourceAchievementRequest = new MatTableDataSource(this.dataSourceAchievementRequest.data
              .filter(x => x !== achievementTableRequest));
            this.alertService.success('Achievement request was declined!');
          },
          error => this.alertService.error());
    }
  }

  getImageUrl(imageId: string) {
    return this.requestService.getAvatar(imageId);
  }

  paginatorEvent(event, formGroup) {
    formGroup.patchValue({
      page: event.pageIndex + 1,
      limit: event.pageSize
    });
  }
}
