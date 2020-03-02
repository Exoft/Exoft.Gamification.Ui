import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../app/services/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild('filtersContainer', {static: true}) filtersContainer: ElementRef;

  private unsubscribe: Subject<void> = new Subject();

  products = [
    {
      image: 'http://unsplash.it/600/400?image=1054',
      title: 'Product title',
      price: '250'
    },
    {
      image: 'http://unsplash.it/1024/768?image=1071',
      title: 'Product title',
      price: '537'
    },
    {
      image: 'http://unsplash.it/500/760?image=1076',
      title: 'Product title',
      price: '378'
    },
    {
      image: 'http://unsplash.it/600/400?image=1080',
      title: 'Product title',
      price: '1000'
    },
    {
      image: 'http://unsplash.it/600/400?image=1054',
      title: 'Product title',
      price: '250'
    },
    {
      image: 'http://unsplash.it/1024/768?image=1077',
      title: 'Product title',
      price: '537'
    },
    {
      image: 'http://unsplash.it/500/760?image=1076',
      title: 'Product title',
      price: '378'
    },
    {
      image: 'http://unsplash.it/600/400?image=1016',
      title: 'Product title',
      price: '1000'
    },
    {
      image: 'http://unsplash.it/600/400?image=981',
      title: 'Product title',
      price: '250'
    },
    {
      image: 'http://unsplash.it/1024/768?image=1071',
      title: 'Product title',
      price: '537'
    },
    {
      image: 'http://unsplash.it/500/760?image=1069',
      title: 'Product title',
      price: '378'
    },
    {
      image: 'http://unsplash.it/600/400?image=1016',
      title: 'Product title',
      price: '1000'
    },
    {
      image: 'http://unsplash.it/600/400?image=1054',
      title: 'Product title',
      price: '250'
    },
    {
      image: 'http://unsplash.it/1024/768?image=1071',
      title: 'Product title',
      price: '537'
    },
    {
      image: 'http://unsplash.it/500/760?image=1079',
      title: 'Product title',
      price: '378'
    }
  ];
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

  userData;

  costSliderOptions = {
    floor: 0,
    ceil: 1200
  };

  get columnsCountArray() {
    return window.innerHeight > window.innerWidth || window.innerWidth < 768 ? [0, 1] : [0, 1, 2, 3];
  }

  constructor(private readonly userService: UserService) {
  }

  ngOnInit() {
    this.products.forEach(product => {
      product['size'] = this.getProductCardSize();
    });

    this.getUserData();
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
    this.filtersContainer.nativeElement.scrollIntoView({ top: -200, behavior: 'smooth' });
  }
}
