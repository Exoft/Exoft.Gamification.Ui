import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {UserWithShortInfo} from '../../../app/models/user/user-with-short-info';
import {FormControl, FormGroup} from '@angular/forms';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {RequestService} from '../../../app/services/request.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';
import {UserService} from '../../../app/services/user.service';
import {User} from '../../../app/models/user/user';
import {AddUserComponent} from '../modals/add-user/add-user.component';
import {EditUserComponent} from '../modals/edit-user/edit-user.component';
import {AssignAchievementsComponent} from '../modals/assign-achievements/assign-achievements.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('userPaginator', {static: true}) userPaginator: MatPaginator;

  private unsubscribe$: Subject<void> = new Subject();
  private dialogRef: MatDialogRef<any>;

  userData: UserWithShortInfo[] = [];
  currentUser: FormGroup;

  letterAvatar = getFirstLetters;

  paginatorPageSizeOptions: number[] = [5, 10, 20, 50];

  displayedColumnsUser: string[] = ['avatar', 'firstName', 'lastName', 'xp', 'actions'];
  dataSourceUser = new MatTableDataSource<UserWithShortInfo>();
  userPaginatorTotalItems = 0;
  userFilterForm = new FormGroup({
    page: new FormControl(1),
    limit: new FormControl(20)
  });

  constructor(private readonly requestService: RequestService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly alertService: AlertService,
              private readonly userService: UserService,
              private readonly dialog: MatDialog) {
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
        this.currentUser = u;
      });
  }

  private loadUserData() {
    const currentPage = this.userFilterForm.get('page').value;
    const pageSize = this.userFilterForm.get('limit').value;

    this.spinnerService.showSpinner();
    this.requestService.getAllUsers(currentPage, pageSize)
      .pipe(finalize(() => this.spinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(response => {
          this.userData = response.data;
          this.dataSourceUser.data = this.userData;
          this.userPaginatorTotalItems = response.totalItems;
        },
        error => this.alertService.error());
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';

    this.dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        if (!!res) {
          this.loadUserData();
        }
      });
  }

  editUser(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.data = id;

    this.dialogRef = this.dialog.open(EditUserComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: UserWithShortInfo) => {
        if (result) {
          this.dataSourceUser.data[
            this.dataSourceUser.data.indexOf(
              this.dataSourceUser.data.find(x => x.id === result.id))] = result;
          this.dataSourceUser = new MatTableDataSource(this.dataSourceUser.data);
        }
      });
  }

  deleteUser(user: UserWithShortInfo) {
    this.spinnerService.showSpinner();
    this.userService.deleteUserById(user.id)
      .pipe(finalize(() => this.spinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(res => {
          this.dataSourceUser = new MatTableDataSource(this.dataSourceUser.data.filter(x => x !== user));
          this.alertService.success('User was successfully deleted!');
        },
        error => this.alertService.error());
  }

  assignUserAchievements(user: User) {
    this.dialogRef = this.dialog.open(AssignAchievementsComponent, {
      width: '600px',
      data: user.id
    });
  }

  getImageUrl(imageId: string) {
    return this.requestService.getAvatar(imageId);
  }

  paginatorEvent(event) {
    this.userFilterForm.patchValue({
      page: event.pageIndex + 1,
      limit: event.pageSize
    });
    this.loadUserData();
  }
}
