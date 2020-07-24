import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {OrderCreate} from '../../../app/models/orders/order-create';
import {FormControl, FormGroup} from 'ngx-strongly-typed-forms';
import {RequestService} from '../../../app/services/request.service';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {EditOrderComponent} from '../modals/edit-order/edit-order.component';
import {Order} from '../../../app/models/orders/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild('ordersPaginator', {static: true}) ordersPaginator: MatPaginator;

  private unsubscribe$: Subject<void> = new Subject();
  private dialogRef: MatDialogRef<any>;

  ordersData: Order[] = [];

  paginatorPageSizeOptions: number[] = [5, 10, 20, 50];

  displayedColumns: string[] = ['icon', 'title', 'description', 'price', 'actions'];
  dataSource = new MatTableDataSource<Order>();
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
    this.requestService.getOrders(this.filterForm.value.page, this.filterForm.value.limit)
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.ordersData = res.data;
          this.dataSource.data = this.ordersData;
          this.paginatorTotalItems = res.totalItems;
        },
        error => this.alertService.error());
  }

  deleteOrder(order: OrderCreate) {
    this.spinnerService.showSpinner();
    this.requestService.deleteOrder(order.id)
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.alertService.success('Order was successfully deleted');
          this.loadData();
        },
        error => this.alertService.error());
  }

  addOrder() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';

    this.dialogRef = this.dialog.open(EditOrderComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        if (!!res) {
          this.loadData();
        }
      });
  }

  editOrder(order: OrderCreate) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.data = order;

    this.dialogRef = this.dialog.open(EditOrderComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        if (!!res) {
          this.loadData();
        }
      });
  }

  paginatorEvent(event) {
    this.filterForm.patchValue({
      page: event.pageIndex + 1,
      limit: event.pageSize
    });
    this.loadData();
  }

  getImageUrl(imageId: string) {
    return this.requestService.getAvatar(imageId);
  }
}
