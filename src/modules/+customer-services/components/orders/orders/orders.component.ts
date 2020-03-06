import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../app/services/user.service';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {RequestService} from '../../../../app/services/request.service';
import {LoadSpinnerService} from '../../../../app/services/load-spinner.service';
import {AlertService} from '../../../../app/services/alert.service';
import {Order} from '../../../../app/models/orders/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild('filtersContainer', {static: true}) filtersContainer: ElementRef;

  private unsubscribe: Subject<void> = new Subject();

  productsTypes = [
    {
      title: 'Apple'
    },
    {
      title: 'Xiaomi'
    },
    {
      title: 'Android'
    },
    {
      title: 'Health'
    },
    {
      title: 'Android'
    },
    {
      title: 'Xiaomi'
    },
    {
      title: 'Health'
    },
    {
      title: 'Apple'
    },
    {
      title: 'Xiaomi'
    },
    {
      title: 'Apple'
    }
  ];

  products: Order[] = [];

  userData;

  costSliderOptions = {
    floor: 0,
    ceil: 1200
  };

  get columnsCountArray() {
    return window.innerHeight > window.innerWidth || window.innerWidth < 768 ? [0, 1] : [0, 1, 2, 3];
  }

  constructor(private readonly userService: UserService,
              private readonly requestService: RequestService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly alertService: AlertService) {
  }

  ngOnInit() {


    this.getUserData();
    this.loadProducts();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getUserData() {
    this.userService.getUserData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.userData = res);
  }

  private loadProducts() {
    this.spinnerService.showSpinner();

    this.requestService.getOrders()
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.products = res.data;
          this.setProductsSize();
        },
        error => this.alertService.error());
  }

  private setProductsSize() {
    this.products.forEach(product => {
      product.size = this.getProductCardSize();
    });
  }

  getProductsByColumn(columnIndex: number) {
    const columnProducts = [];
    const diff = window.innerHeight > window.innerWidth || window.innerWidth < 768 ? 2 : 4;

    for (let i = columnIndex; i < this.products.length; i = i + diff) {
      columnProducts.push(this.products[i]);
    }

    return columnProducts;
  }

  getProductCardSize() {
    const index = Math.floor(Math.random() * 4) + 1;

    if (index === 4) {
      return 'large';
    } else if (index === 3) {
      return 'big';
    } else if (index === 2) {
      return 'medium';
    }

    return 'small';
  }

  scrollToTop() {
    this.filtersContainer.nativeElement.scrollIntoView({top: -200, behavior: 'smooth'});
  }

  getImage(imageId: string) {
    return this.requestService.getAvatar(imageId);
  }
}
