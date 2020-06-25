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
import {Category} from '../../../../app/models/categories/category';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  form: FormGroup<OrderCreate>;
  iconUrl: string;

  categories: Category[];

  constructor(private readonly requestService: RequestService,
              private readonly alertService: AlertService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly fb: FormBuilder,
              private dialog: MatDialogRef<EditOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public order: Order) {
  }

  ngOnInit() {
    this.loadCategories();
    this.setForm();
    this.iconUrl = !!this.order ? this.getImageUrl(this.order.iconId as string) : null;
  }

  private loadCategories() {
    this.spinnerService.showSpinner();
    this.requestService.getCategories()
      .pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
        this.categories = res.data;
      });
  }

  private setForm() {
    const orderDataToSet = !!this.order ? this.order : null;

    this.form = this.fb.group<OrderCreate>({
      id: !!orderDataToSet ? orderDataToSet.id : null,
      title: [!!orderDataToSet ? orderDataToSet.title : null, Validators.required],
      description: [!!orderDataToSet ? orderDataToSet.description : null, Validators.required],
      price: [!!orderDataToSet ? orderDataToSet.price : null, Validators.required],
      icon: [!!orderDataToSet ? orderDataToSet.iconId : null, Validators.required],
      categoryIds: !!orderDataToSet ? [] : null
    });

    const categoriesIds = !!orderDataToSet && !!orderDataToSet.categories ? orderDataToSet.categories.map(c => c.id) : [];
    this.form.controls.categoryIds.setValue(categoriesIds);
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
      if (Array.isArray(order[key])) {
        order[key].forEach(orderItem => formData.append(key, orderItem));
      } else {
        formData.append(key, order[key]);
      }
    });

    const request = !!this.order
      ? this.requestService.updateOrder(formData, order.id)
      : this.requestService.createOrder(formData);

    this.spinnerService.showSpinner();
    request.pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.alertService.success('Data was successfully saved!');
          this.dialog.close(true);
        },
        error => this.alertService.error());
  }

  isCategorySelected(category: Category) {
    const selectedCategories = this.form.value.categoryIds;
    return !!selectedCategories ? selectedCategories.some(selectedCategory => selectedCategory === category.id) : false;
  }

  onCategoryClick(category: Category) {
    if (!this.form.value.categoryIds) {
      this.form.controls.categoryIds.setValue([]);
    }

    const selectedCategories = this.form.value.categoryIds;

    if (this.isCategorySelected(category)) {
      const categoryIndex = selectedCategories.findIndex(selectedCategory => selectedCategory === category.id);
      selectedCategories.splice(categoryIndex, 1);
    } else {
      selectedCategories.push(category.id);
    }

    this.form.controls.categoryIds.setValue(selectedCategories);
  }
}
