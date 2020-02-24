import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {UserService} from 'src/modules/app/services/user.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {PostUser} from 'src/modules/app/models/user/post-user';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';
import {passwordContainValidity, passwordEqualityValidator} from '../../functions/add-user-validators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  avatarUrl: string;
  form: FormGroup<PostUser>;

  letterAvatar = getFirstLetters;

  constructor(
    private dialog: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    private readonly loadSpinnerService: LoadSpinnerService,
    private readonly alertService: AlertService) {
  }

  ngOnInit() {
    this.setForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setForm() {
    this.form = this.fb.group<PostUser>({
        userName: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        roles: ['User'],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          passwordContainValidity
        ]],
        confirmPassword: ['', Validators.required],
        status: '',
        avatar: null
      },
      {validators: passwordEqualityValidator})
    ;
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.controls.avatar.setValue(event.target.files[0]);
      this.form.controls.avatar.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = () => {
        this.avatarUrl = fileReader.result.toString();
      };
    }
  }

  onSaveChanges() {
    if (this.form.valid) {
      this.loadSpinnerService.showSpinner();
      this.userService.createUser(this.form.value)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.alertService.success('User was successfully added!');
            this.dialog.close(res);
          },
          error => {
            this.alertService.error();
          });
    }
  }
}
