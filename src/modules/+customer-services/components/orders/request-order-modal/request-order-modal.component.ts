import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Order} from '../../../../app/models/orders/order';
import {RequestService} from '../../../../app/services/request.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadSpinnerService} from '../../../../app/services/load-spinner.service';
import {AlertService} from '../../../../app/services/alert.service';
import {finalize} from 'rxjs/operators';
import {OrderRequest} from '../../../../app/models/order-request/order-request';

@Component({
  selector: 'app-request-order-modal',
  templateUrl: './request-order-modal.component.html',
  styleUrls: ['./request-order-modal.component.scss']
})
export class RequestOrderModalComponent implements OnInit {
  orderRequestForm: FormGroup;

  constructor(private readonly requestService: RequestService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly alertService: AlertService,
              private dialog: MatDialogRef<RequestOrderModalComponent>,
              @Inject(MAT_DIALOG_DATA) public order: Order) {
  }

  ngOnInit(): void {
    this.orderRequestForm = new FormGroup({
      message: new FormControl(null, Validators.required)
    });
  }

  getImageUrl(imageId: string): string {
    return this.requestService.getAvatar(imageId);
  }

  requestOrder(): void {
    if (this.orderRequestForm.valid) {
      const formData: OrderRequest = {
        message: this.orderRequestForm.get('message').value,
        orderId: this.order.id
      };

      this.spinnerService.showSpinner();
      this.requestService.requestOrder(formData).pipe(finalize(() => this.spinnerService.hideSpinner())).subscribe(res => {
        this.alertService.success('Order was successfully requested!');
        this.dialog.close();
      }, error => this.alertService.error());
    }
  }
}
