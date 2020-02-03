import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../app/services/user.service';
import {UpdateUser} from '../../../app/models/user/update-user';
import {finalize, takeUntil} from 'rxjs/operators';
import {Validators} from '@angular/forms';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  form: FormGroup<UpdateUser>;
  avatarUrl: string;

  letterAvatar = getFirstLetters;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private dialog: MatDialogRef<EditUserComponent>,
              private notification: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) private userId: string,
              private readonly loadSpinnerService: LoadSpinnerService) {
  }

  ngOnInit() {
    this.setForm();
    this.loadData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setForm() {
    this.form = this.fb.group<UpdateUser>({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      status: '',
      email: ['', [Validators.required, Validators.email]],
      roles: null,
      avatar: null
    });
  }

  private loadData() {
    this.loadSpinnerService.showSpinner();
    this.userService.getUserInfoById(this.userId)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
      .subscribe(res => {
          this.form.patchValue(res);
          this.avatarUrl = !!res.avatarId ? this.userService.getAvatarUrl(res.avatarId) : null;
        },
        error => {
          this.notification.open('An error occurred while data loading!', 'Close', {duration: 5000});
        }
      );
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
      const formData = new FormData();
      Object.keys(this.form.value).forEach((key: any) => {
        formData.append(key, !!this.form.controls[key].value ? this.form.controls[key].value : '');
      });

      this.loadSpinnerService.showSpinner();
      this.userService.updateUserInfoById(this.userId, formData)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()), takeUntil(this.unsubscribe$))
        .subscribe((res) => {
            this.notification.open('Data was successfully changed!', 'Close', {duration: 5000});
            this.dialog.close(res);
          },
          error => {
            this.notification.open('An error occurred while data saving!', 'Close', {duration: 5000});
          });
    }
  }
}
