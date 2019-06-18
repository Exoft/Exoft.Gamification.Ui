import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public profileSettingsForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailAddress: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    status: new FormControl(''),
    avatar: new FormControl('')
  });

  public avatarUrl: string;

  constructor(private userService: UserService, private location: Location) {}

  public ngOnInit() {
    this.subscribeToUserDataChange();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public subscribeToUserDataChange() {
    this.userService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        const {
          userName,
          firstName,
          lastName,
          emailAddress,
          status,
          avatar
        } = res.userInfo;
        this.profileSettingsForm.setValue({
          userName,
          firstName,
          lastName,
          emailAddress,
          status,
          avatar
        });
        this.avatarUrl = avatar;
      });
  }

  public onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (imageLoading: Event) => {
        this.profileSettingsForm.get('avatar').setValue(event.target.files[0]);
        this.avatarUrl = fileReader.result.toString();
      };
    }
  }

  public onSaveChanges() {
    if (this.profileSettingsForm.valid) {
      const {
        userName,
        firstName,
        lastName,
        emailAddress,
        status,
        avatar
      } = this.profileSettingsForm.value;
      const formData = {
        avatar,
        userName,
        firstName,
        lastName,
        emailAddress,
        status
      };

      this.userService.updateUserInfo(formData, '1').subscribe(
        res => {
          //
        },
        error => {
          //
        }
      );
    }
  }

  public onGoBack() {
    this.location.back();
  }
}
