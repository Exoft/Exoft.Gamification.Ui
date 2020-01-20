import {Component, Inject, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {FormControl, FormBuilder, FormGroup} from 'ngx-strongly-typed-forms'
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {UserService} from '../../../app/services/user.service';
import {RequestService} from 'src/modules/app/services/request.service';
import {UpdateUser} from '../../../app/models/user/update-user';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject();
  public profileSettingsForm: FormGroup<UpdateUser>;
  public avatarUrl: string;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private requestService: RequestService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.userService.getUserInfoById(this.data.userId).subscribe(res => {
      const {
        avatarId,
        email,
        firstName,
        lastName,
        status,
        userName,
        roles
      } = res;
      this.avatarUrl = this.requestService.getAvatar(avatarId);

      this.profileSettingsForm.setValue({
        avatar: avatarId,
        email,
        firstName,
        lastName,
        status,
        userName,
        role: roles[0]
      });
    });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSaveChanges(): void {
    if (this.profileSettingsForm.valid) {
      this.userService.updateUserInfoById(this.data.userId, this.profileSettingsForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.dialog.closeAll();
        });
    }
  }

  public initializeForm() {
    this.profileSettingsForm = this.formBuilder.group<UpdateUser>({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ],
      role: [[]],
      status: ['']
    });
  }
}
