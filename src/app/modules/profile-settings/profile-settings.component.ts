import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public profileSettingsForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailAddress: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    status: new FormControl('')
  });

  public avatarSource: string;
  public selectedAvatar;

  constructor(private userService: UserService, private location: Location) {}

  public ngOnInit() {
    const {
      userName,
      firstName,
      lastName,
      emailAddress,
      status
    } = this.profileSettingsForm.controls;

    this.userService.getUserInfo('1').subscribe(res => {
      this.avatarSource = res.body.avatar;
      userName.setValue(res.body.userName);
      firstName.setValue(res.body.firstName);
      lastName.setValue(res.body.lastName);
      emailAddress.setValue(res.body.emailAddress),
        status.setValue(res.body.status);
    });
  }

  public onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (imageLoading: Event) => {
        this.avatarSource = fileReader.result.toString();
        this.selectedAvatar = fileReader.result;
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
        status
      } = this.profileSettingsForm.value;
      const formData = {
        avatar: this.selectedAvatar,
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
