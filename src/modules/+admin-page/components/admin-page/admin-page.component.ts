import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {RequestService} from 'src/modules/app/services/request.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
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
import {forkJoin, Subject} from 'rxjs';
import {ReadUser} from 'src/modules/app/models/user/read-user';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {MatPaginator} from '@angular/material';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  @ViewChild('userPaginator', {static: true}) userPaginator: MatPaginator;
  @ViewChild('achievementPaginator', {static: true}) achievementPaginator: MatPaginator;

  private unsubscribe$: Subject<void> = new Subject();

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
              private readonly loadSpinnerService: LoadSpinnerService) {
  }

  ngOnInit() {
    this.loadAllData();
    this.initCurrentUser();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadAllData() {
    const userCurrentPage = this.userFilterForm.get('page').value;
    const achievementCurrentPage = this.achievementFilterForm.get('page').value;
    const userPageSize = this.userFilterForm.get('limit').value;
    const achievementPageSize = this.achievementFilterForm.get('limit').value;

    const requests = [
      this.requestService.getAllUsers(userCurrentPage, userPageSize),
      this.requestService.getAllAchievements(achievementCurrentPage, achievementPageSize),
      this.requestService.getAllAchievementRequests()
    ];

    this.loadSpinnerService.showSpinner();
    forkJoin(requests)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(res => {
        this.userData = res[0].data;
        this.dataSourceUser.data = this.userData;
        this.userPaginatorTotalItems = res[0].totalItems;

        this.achievementsData = res[1].data;
        this.dataSourceAchievements.data = this.achievementsData;
        this.achievementPaginatorTotalItems = res[1].totalItems;

        this.dataSourceAchievementRequest = new MatTableDataSource(res[2]);
      });
  }

  private initCurrentUser() {
    this.userService.getCurrentUserInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(u => {
        this.currentUser = this.mapperService.getUser(u);
        this.isInfoLoaded = true;
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
    this.loadSpinnerService.showSpinner();
    this.userService.deleteUserById(user.id)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
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
    this.loadSpinnerService.showSpinner();
    this.achievementService.deleteAchievementById(achievement.id)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.dataSourceAchievements = new MatTableDataSource(this.dataSourceAchievements.data.filter(x => x !== achievement));
      });
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
      });
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
      });
  }

  openAssignAchievementWindow(user: User) {
    this.dialog.open(AssignAchievementsComponent, {
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
        });
    } else {
      this.requestService.declineAchievementRequest(achievementTableRequest.id)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
        .subscribe(res => {
          this.dataSourceAchievementRequest = new MatTableDataSource(this.dataSourceAchievementRequest.data
            .filter(x => x !== achievementTableRequest));
        });
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
