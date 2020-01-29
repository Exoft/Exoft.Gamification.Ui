import {Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {UserService} from 'src/modules/app/services/user.service';
import {passwordContainValidity, passwordEqualityValidator} from '../../functions/add-user-validators';
import {takeUntil} from 'rxjs/operators';
import {PostUser} from 'src/modules/app/models/user/post-user';
import {getFirstLetters} from '../../../app/utils/letterAvatar';

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
    private readonly notification: MatSnackBar) {
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
      this.userService.createUser(this.form.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => {
            this.notification.open('Data was successfully saved!', 'Close', {duration: 5000});
            this.dialog.close(res);
          },
          error => {
            this.notification.open('An error occurred while data saving!', 'Close', {duration: 5000});
          });
    }
  }
}
