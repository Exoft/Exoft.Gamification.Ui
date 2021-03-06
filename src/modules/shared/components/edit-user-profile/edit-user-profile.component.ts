import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {Subject} from 'rxjs';
import {UserService} from '../../../app/services/user.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {getFirstLetters} from '../../../app/utils/letterAvatar';
import {Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {environment} from 'src/environments/environment';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {AlertService} from '../../../app/services/alert.service';

export interface UserEditData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  avatar: string | File;
}

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  form: FormGroup<UserEditData>;

  avatarUrl: string;
  avatarId: string;

  public letterAvatar = getFirstLetters;

  constructor(
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    private userService: UserService,
    private readonly alertService: AlertService,
    private readonly loadSpinnerService: LoadSpinnerService
  ) {
  }

  ngOnInit() {
    this.setForm();
    this.getUserData();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private setForm() {
    this.form = this.fb.group<UserEditData>({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: '',
      email: ['', Validators.required],
      status: '',
      avatar: null
    });
  }

  private getUserData() {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        if (Object.entries(res).length !== 0) {
          this.form.patchValue(res);

          this.avatarUrl = !!res.avatarId ? res.avatar : null;
          this.avatarId = res.avatarId;
        }
      });
  }

  private createFormData() {
    const formData = new FormData();

    for (const field of Object.keys(this.form.controls)) {
      formData.append(
        field,
        !!this.form.controls[field].value ? this.form.controls[field].value : ''
      );
    }

    return formData;
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (imageLoading: Event) => {
        this.form.controls.avatar.setValue(event.target.files[0]);
        this.avatarUrl = fileReader.result.toString();
      };
    }
  }

  getAvatarUrl(avatarId: any) {
    return this.userService.getAvatarUrl(avatarId);
  }

  saveUserData() {
    if (this.form.valid) {
      const formData = this.createFormData();
      this.loadSpinnerService.showSpinner();

      this.userService.updateUserInfo(formData)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
        .subscribe(
          res => {
            const timeStamp = Date.now();
            const newUserData = {...res};
            newUserData.avatar = `${environment.apiUrl}/api/files/${newUserData.avatarId}/?timeStamp=${timeStamp}`;
            this.userService.setUserData(newUserData);

            this.alertService.success('Data was successfully saved!');
            this.closeDialog();
          },
          error => this.alertService.error()
        );
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
