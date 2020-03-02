import {Component, Inject, OnInit} from '@angular/core';
import {RequestService} from '../../../../app/services/request.service';
import {AlertService} from '../../../../app/services/alert.service';
import {LoadSpinnerService} from '../../../../app/services/load-spinner.service';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderCreate} from '../../../../app/models/orders/order-create';
import {Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {Order} from '../../../../app/models/orders/order';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  form: FormGroup<OrderCreate>;
  iconUrl: string;

  constructor(private readonly requestService: RequestService,
              private readonly alertService: AlertService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly fb: FormBuilder,
              private dialog: MatDialogRef<EditOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public order: Order) {
  }

  ngOnInit() {
    this.setForm();
    this.iconUrl = !!this.order ? this.getImageUrl(this.order.icon as string) : null;
  }

  setForm() {
    const orderDataToSet = !!this.order ? this.order : null;
    this.form = this.fb.group<OrderCreate>({
      id: !!orderDataToSet ? orderDataToSet.id : null,
      title: [!!orderDataToSet ? orderDataToSet.title : null, Validators.required],
      description: [!!orderDataToSet ? orderDataToSet.description : null, Validators.required],
      price: [!!orderDataToSet ? orderDataToSet.price : null, Validators.required],
      icon: [!!orderDataToSet ? orderDataToSet.icon : null, Validators.required],
      // TODO: set user chosen product types
      categoryIds: ['C4BE6A02-2BF8-4BB6-B7E7-2A4A77EDD377']
    });
  }

  private getImageUrl(imageId: string) {
    return this.requestService.getAvatar(imageId);
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.controls.icon.setValue(event.target.files[0]);
      this.form.controls.icon.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = () => {
        this.iconUrl = fileReader.result.toString();
      };
    }
  }

  onSaveChanges() {
    const formData = new FormData();
    const order = this.form.value;
    Object.keys(order).forEach(key => {
      formData.append(key, order[key]);
    });

    this.spinnerService.showSpinner();
    this.requestService.createOrder(formData)
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.alertService.success('Data was successfully saved!');
          this.dialog.close(true);
        },
        error => this.alertService.error());
  }
}
