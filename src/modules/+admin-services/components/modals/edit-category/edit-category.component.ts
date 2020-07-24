import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {RequestService} from '../../../../app/services/request.service';
import {AlertService} from '../../../../app/services/alert.service';
import {LoadSpinnerService} from '../../../../app/services/load-spinner.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Category} from '../../../../app/models/categories/category';
import {CategoryCreate} from '../../../../app/models/categories/category-create';
import {Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup<CategoryCreate>;
  iconUrl: string;

  constructor(private readonly requestService: RequestService,
              private readonly alertService: AlertService,
              private readonly spinnerService: LoadSpinnerService,
              private readonly fb: FormBuilder,
              private dialog: MatDialogRef<EditCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category) {
  }

  ngOnInit() {
    this.setForm();
    this.iconUrl = !!this.category ? this.getImageUrl(this.category.iconId as string) : null;
  }

  private setForm() {
    const categoryDataToSet = !!this.category ? this.category : null;

    this.form = this.fb.group<CategoryCreate>({
      id: !!categoryDataToSet ? categoryDataToSet.id : null,
      name: [!!categoryDataToSet ? categoryDataToSet.name : null, Validators.required],
      icon: [!!categoryDataToSet ? categoryDataToSet.iconId : null, Validators.required]
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
    const category = this.form.value;
    Object.keys(category).forEach(key => {
      formData.append(key, category[key]);
    });

    const request = !!this.category
      ? this.requestService.updateCategory(formData, category.id)
      : this.requestService.createCategory(formData);

    this.spinnerService.showSpinner();
    request.pipe(finalize(() => this.spinnerService.hideSpinner()))
      .subscribe(res => {
          this.alertService.success('Data was successfully saved!');
          this.dialog.close(true);
        },
        error => this.alertService.error());
  }
}
