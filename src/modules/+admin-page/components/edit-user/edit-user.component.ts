import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {UserService} from "../../../app/services/user.service";

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
    status: new FormControl(''),
    avatar: new FormControl('')
  });

  constructor(public dialog: MatDialog,
              private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUserInfoById('5c2a0cf6-93ac-40ad-ad6c-0c6847d5192b').subscribe(u => {
debugger;
    });
  }

}
