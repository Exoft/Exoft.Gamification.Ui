import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher, MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ValidationService} from '../../../app/services/validation.service';
import {ChangePasswordForm} from '../../../app/models/password/change-password-form';
import {NewPassword} from '../../../app/models/password/new-password';
import {ChangePassword} from '../../../app/models/password/change-password';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';
import {UserService} from '../../../app/services/user.service';
import {finalize} from 'rxjs/operators';

export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

    return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  form: FormGroup<ChangePasswordForm>;
  parentErrorStateMatcher: ParentErrorStateMatcher = new ParentErrorStateMatcher();

  get newPasswordForm() {
    return this.form.controls.newPassword as FormGroup<NewPassword>;
  }

  constructor(private readonly dialog: MatDialog,
              private readonly fb: FormBuilder,
              private readonly validationService: ValidationService,
              private readonly loadSpinnerService: LoadSpinnerService,
              private readonly alertService: AlertService,
              private readonly userService: UserService) {
  }

  ngOnInit() {
    this.setForm();
  }

  private setForm() {
    this.form = this.fb.group<ChangePasswordForm>({
      oldPassword: ['', Validators.required],
      newPassword: this.fb.group<NewPassword>({
        password: ['',
          [
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
          ]
        ],
        confirmPassword: ['', Validators.required]
      }, {validator: this.validationService.passwordsAreEqualValidator()})
    });

  }

  closeDialog() {
    this.dialog.closeAll();
  }

  changePassword() {
    if (this.form.valid) {
      const passwordData: ChangePassword = {
        oldPassword: this.form.value.oldPassword,
        newPassword: this.form.value.newPassword.password,
        confirmNewPassword: this.form.value.newPassword.confirmPassword,
      };

      this.loadSpinnerService.showSpinner();
      this.userService.changePassword(passwordData)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
        .subscribe(res => {
            this.alertService.success('Password successfully changed. You can now log in with your new password.');
            this.dialog.closeAll();
          },
          error => this.alertService.error());
    }
  }
}
