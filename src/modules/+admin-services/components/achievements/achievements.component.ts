import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {Achievement} from '../../../app/models/achievement/achievement';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestService} from '../../../app/services/request.service';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {AchievementsService} from '../../../app/services/achievements.service';
import {AddAchievementComponent} from '../add-achievement/add-achievement.component';
import {EditAchievementComponent} from '../edit-achievement/edit-achievement.component';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit, OnDestroy {
  @ViewChild('achievementPaginator', {static: true}) achievementPaginator: MatPaginator;

  private unsubscribe$: Subject<void> = new Subject();
  private dialogRef: MatDialogRef<any>;

  achievementsData: Achievement[] = [];

  paginatorPageSizeOptions: number[] = [5, 10, 20, 50];

  displayedColumnsAchievements: string[] = ['icon', 'name', 'description', 'xp', 'actions'];
  dataSourceAchievements = new MatTableDataSource<Achievement>();
  achievementPaginatorTotalItems = 0;
  achievementFilterForm = new FormGroup({
    page: new FormControl(1),
    limit: new FormControl(20)
  });

  constructor(private readonly requestService: RequestService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly alertService: AlertService,
              private readonly achievementService: AchievementsService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadAchievementData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private loadAchievementData() {
    const currentPage = this.achievementFilterForm.get('page').value;
    const pageSize = this.achievementFilterForm.get('limit').value;

    this.spinnerService.showSpinner();
    this.requestService.getAllAchievements(currentPage, pageSize)
      .pipe(finalize(() => this.spinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(response => {
          this.achievementsData = response.data;
          this.dataSourceAchievements.data = this.achievementsData;
          this.achievementPaginatorTotalItems = response.totalItems;
        },
        error => this.alertService.error());
  }

  addAchievement() {
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

  editAchievement(achievement: Achievement) {
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

  deleteAchievement(achievement: Achievement) {
    this.spinnerService.showSpinner();
    this.achievementService.deleteAchievementById(achievement.id)
      .pipe(finalize(() => this.spinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(res => {
          this.dataSourceAchievements = new MatTableDataSource(this.dataSourceAchievements.data.filter(x => x !== achievement));
          this.alertService.success('Achievement was successfully deleted!');
        },
        error => this.alertService.error());
  }

  getImageUrl(imageId: string) {
    return this.requestService.getAvatar(imageId);
  }

  paginatorEvent(event) {
    this.achievementFilterForm.patchValue({
      page: event.pageIndex + 1,
      limit: event.pageSize
    });
    this.loadAchievementData();
  }
}
