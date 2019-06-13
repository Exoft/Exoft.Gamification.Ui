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
    status: new FormControl(''),
    avatar: new FormControl('')
  });

  constructor(private userService: UserService, private location: Location) {}

  public ngOnInit() {
    this.userService.getUserInfo('1').subscribe(res => {
      const {
        userName,
        firstName,
        lastName,
        emailAddress,
        status,
        avatar
      } = res.body;
      this.profileSettingsForm.setValue({
        userName,
        firstName,
        lastName,
        emailAddress,
        status,
        avatar
      });
    });
  }

  public onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (imageLoading: Event) => {
        this.profileSettingsForm
          .get('avatar')
          .setValue(fileReader.result.toString());
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
