import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {finalize} from 'rxjs/operators';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';
import {RequestService} from '../../../app/services/request.service';
import {OrderRequestWithDetails} from '../../../app/models/order-request/order-request-with-details';

@Component({
  selector: 'app-orders-requests',
  templateUrl: './orders-requests.component.html',
  styleUrls: ['./orders-requests.component.scss']
})
export class OrdersRequestsComponent implements OnInit {
  displayedColumnsOrdersRequests: string[] = ['userName', 'order', 'comment', 'actions'];
  dataSourceOrderRequest = new MatTableDataSource<OrderRequestWithDetails>();

  constructor(private readonly spinnerService: LoadSpinnerService,
              private readonly alertService: AlertService,
              private readonly requestService: RequestService) {
  }

  ngOnInit() {
    this.loadRequestOrdersData();
  }

  private loadRequestOrdersData() {
    this.spinnerService.showSpinner();
    this.requestService.getAllOrdersRequests()
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.dataSourceOrderRequest = new MatTableDataSource(res);
        },
        error => this.alertService.error());
  }

  onRequestDecision(orderTableRequest, isApproved: boolean) {
    this.spinnerService.showSpinner();
    if (isApproved) {
      this.requestService.approveOrderRequest(orderTableRequest.id)
        .pipe(finalize(() => this.spinnerService.hideSpinner()))
        .subscribe(res => {
            this.dataSourceOrderRequest = new MatTableDataSource(this.dataSourceOrderRequest.data
              .filter(x => x !== orderTableRequest));
            this.alertService.success('Order request was approved!');
          },
          error => this.alertService.error());
    } else {
      this.requestService.declineOrderRequest(orderTableRequest.id)
        .pipe(finalize(() => this.spinnerService.hideSpinner()))
        .subscribe(res => {
            this.dataSourceOrderRequest = new MatTableDataSource(this.dataSourceOrderRequest.data
              .filter(x => x !== orderTableRequest));
            this.alertService.success('Order request was declined!');
          },
          error => this.alertService.error());
    }
  }
}
