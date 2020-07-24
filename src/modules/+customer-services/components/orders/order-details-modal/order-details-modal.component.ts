import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Order} from '../../../../app/models/orders/order';
import {RequestService} from '../../../../app/services/request.service';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent {
  constructor(private readonly requestService: RequestService,
              private dialog: MatDialogRef<OrderDetailsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { order: Order, availableXp: number }) {
  }

  getImageUrl(imageId: string): string {
    return this.requestService.getAvatar(imageId);
  }

  requestOrder(): void {
    this.dialog.close(true);
  }
}
