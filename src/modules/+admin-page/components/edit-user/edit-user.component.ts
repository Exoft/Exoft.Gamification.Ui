import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {UserService} from '../../../app/services/user.service';

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
    roles: new FormArray([]),
    status: new FormControl(''),
    avatar: new FormControl('')
  });

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUserInfoById(this.data.userId).subscribe(u => {
      this.profileSettingsForm.patchValue(u);
    });
  }

  onSaveChanges() {
    this.userService.updateUserInfoById(this.data.userId, this.profileSettingsForm.value).subscribe(u => {
      this.dialog.closeAll();
    });
  }
}
