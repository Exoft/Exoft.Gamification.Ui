import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/modules/app/services/user.service';
import { environment } from 'src/environments/environment';
import { getFirstLettersWithSplit } from '../app/utils/letterAvatar';
import { RequestService } from '../app/services/dashboardequest.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  public wrongImgUrl = 'http://localhost:5000/api/files/null';
  public profileSettingsForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    status: new FormControl(''),
    avatar: new FormControl('')
  });

  public avatarUrl: string;
  public avatarId: string;
  public userData: any;
  public timeStamp = Date.now();
  public letterAvatar = getFirstLettersWithSplit;
  public userName: string;

  constructor(
    private userService: UserService,
    private location: Location,
    private requestService: RequestService
  ) {}

  public ngOnInit() {
    this.subscribeToUserDataChange();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public subscribeToUserDataChange() {
    this.userService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.userName = res.firstName + ' ' + res.lastName;
        if (Object.entries(res).length !== 0) {
          const {
            userName,
            firstName,
            lastName,
            email,
            status,
            avatar,
            avatarId
          } = res;
          this.profileSettingsForm.setValue({
            userName,
            firstName,
            lastName,
            email,
            status,
            avatar: avatarId
          });
          this.avatarUrl = avatar;
          this.avatarId = avatarId;
        }
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
      const formModel = this.createFormData(this.profileSettingsForm);
      this.userService.updateUserInfo(formModel).subscribe(
        res => {
          this.timeStamp = Date.now();
          this.userData = { ...res };
          this.userData.avatar =
            environment.apiUrl +
            '/api/files/' +
            this.userData.avatarId +
            '/?timeStamp=' +
            this.timeStamp;
          this.userService.setUserData(this.userData);
        },
        error => {
          //
        }
      );
    }
  }

  createFormData(form: FormGroup): FormData {
    const formData = new FormData();

    for (const field of Object.keys(form.controls)) {
      formData.append(field, form.get(field).value);
    }

    return formData;
  }

  public onGoBack() {
    this.location.back();
  }

  public getAvatarId(avatarId: any) {
    return this.requestService.getAvatar(avatarId);
  }
}
