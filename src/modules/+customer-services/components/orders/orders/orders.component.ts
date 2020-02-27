import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
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
      image: 'http://unsplash.it/500/760?image=1076',
      title: 'Product title',
      price: '378'
    },
    {
      image: 'http://unsplash.it/600/400?image=1016',
      title: 'Product title',
      price: '1000'
    }
  ];
  constructor() {
  }

  ngOnInit() {
  }

}
