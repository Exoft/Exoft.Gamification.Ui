import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {FormControl, FormGroup} from 'ngx-strongly-typed-forms';
import {Category} from '../../../app/models/categories/category';
import {RequestService} from '../../../app/services/request.service';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {EditCategoryComponent} from '../modals/edit-category/edit-category.component';
import {EditOrderComponent} from '../modals/edit-order/edit-order.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild('categoriesPaginator', {static: true}) categoriesPaginator: MatPaginator;

  private unsubscribe$: Subject<void> = new Subject();
  private dialogRef: MatDialogRef<any>;

  categoriesData: Category[] = [];

  paginatorPageSizeOptions: number[] = [5, 10, 20, 50];

  displayedColumns: string[] = ['icon', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>();
  paginatorTotalItems = 0;
  filterForm = new FormGroup({
    page: new FormControl(1),
    limit: new FormControl(20)
  });

  constructor(private readonly requestService: RequestService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly alertService: AlertService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private loadData() {
    this.spinnerService.showSpinner();
    this.requestService.getCategories(this.filterForm.value.page, this.filterForm.value.limit)
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.categoriesData = res.data;
          this.dataSource.data = this.categoriesData;
          this.paginatorTotalItems = res.totalItems;
        },
        error => this.alertService.error());
  }

  addCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';

    this.dialogRef = this.dialog.open(EditCategoryComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        if (!!res) {
          this.loadData();
        }
      });
  }

  editCategory(category: Category) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.data = category;

    this.dialogRef = this.dialog.open(EditCategoryComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        if (!!res) {
          this.loadData();
        }
      });
  }

  deleteCategory(category: Category) {
    this.spinnerService.showSpinner();
    this.requestService.deleteCategory(category.id)
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.alertService.success('Order was successfully deleted');
          this.loadData();
        },
        error => this.alertService.error());
  }

  getImageUrl(imageId: string) {
    return this.requestService.getAvatar(imageId);
  }

  paginatorEvent(event) {
    this.filterForm.patchValue({
      page: event.pageIndex + 1,
      limit: event.pageSize
    });
    this.loadData();
  }
}
