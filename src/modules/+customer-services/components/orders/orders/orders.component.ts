import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../app/services/user.service';
import {forkJoin, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {RequestService} from '../../../../app/services/request.service';
import {LoadSpinnerService} from '../../../../app/services/load-spinner.service';
import {AlertService} from '../../../../app/services/alert.service';
import {Order} from '../../../../app/models/orders/order';
import {Category} from '../../../../app/models/categories/category';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {EditOrderComponent} from '../../../../+admin-services/components/modals/edit-order/edit-order.component';
import {OrderDetailsModalComponent} from '../order-details-modal/order-details-modal.component';
import {RequestOrderModalComponent} from '../request-order-modal/request-order-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild('filtersContainer', {static: true}) filtersContainer: ElementRef;

  private unsubscribe: Subject<void> = new Subject();
  private dialogRef: MatDialogRef<any>;

  productsTypes: Category[] = [];

  products: Order[] = [];

  userData;

  costSliderOptions = {
    floor: 0,
    ceil: 1200
  };

  get isPortrait(): boolean {
    return window.innerHeight > window.innerWidth;
  }

  get isMobile(): boolean {
    return window.innerWidth < 768;
  }

  get isTabletLandscape(): boolean {
    return window.innerWidth / window.innerHeight < 9 / 6;
  }

  get columnsCountArray() {
    return this.isPortrait || this.isMobile ? [0, 1] : this.isTabletLandscape ? [0, 1, 2, 3] : [0, 1, 2, 3, 4];
  }

  constructor(private readonly userService: UserService,
              private readonly requestService: RequestService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly alertService: AlertService,
              private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUserData();
    this.loadProducts();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();

    if (!!this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private getUserData() {
    this.userService.getUserData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.userData = res);
  }

  private loadProducts() {
    this.spinnerService.showSpinner();

    const requests = [
      this.requestService.getOrders(),
      this.requestService.getCategories()
    ];

    forkJoin(requests).pipe(finalize(() => this.spinnerService.hideSpinner()), takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.products = res[0].data as Order[];
        this.productsTypes = res[1].data as Category[];
      }, error => this.alertService.error());
  }

  getProductsByColumn(columnIndex: number) {
    const columnProducts = [];
    const diff = this.isPortrait || this.isMobile ? 2 : this.isTabletLandscape ? 4 : 5;

    for (let i = columnIndex; i < this.products.length; i = i + diff) {
      columnProducts.push(this.products[i]);
    }

    return columnProducts;
  }

  scrollToTop() {
    this.filtersContainer.nativeElement.scrollIntoView({top: -200, behavior: 'smooth'});
  }

  getImage(imageId: string) {
    return this.requestService.getAvatar(imageId);
  }

  openOrderDetails(order: Order) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.backdropClass = 'edit-user-dialog-backdrop';
    dialogConfig.panelClass = 'edit-user-dialog';
    dialogConfig.data = {order, availableXp: this.userData.xp};

    this.dialogRef = this.dialog.open(OrderDetailsModalComponent, dialogConfig);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        if (!!res) {
          dialogConfig.data = order;
          this.dialogRef = this.dialog.open(RequestOrderModalComponent, dialogConfig);
        }
      });
  }
}
