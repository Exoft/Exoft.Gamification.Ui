import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserService } from '../../../app/services/user.service';
import { RequestService } from 'src/modules/app/services/dashboardequest.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public profileSettingsForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    role: new FormControl(''),
    status: new FormControl(''),
    avatar: new FormControl('')
  });
  public avatarUrl: string;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private requestService: RequestService
  ) {}

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

  public onSaveChanges(): void {
    const formModel = this.createFormData(this.profileSettingsForm);
    this.userService
      .updateUserInfoById(this.data.userId, formModel)
      .subscribe(u => {
        this.dialog.closeAll();
      });
  }

  public onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (imageLoading: Event) => {
        this.profileSettingsForm.get('avatar').setValue(event.target.files[0]);
        this.avatarUrl = fileReader.result.toString();
      };
    }
  }

  public createFormData(form: FormGroup): FormData {
    const formData = new FormData();
    for (const field of Object.keys(form.controls)) {
      formData.append(field, form.get(field).value);
    }

    return formData;
  }
}
