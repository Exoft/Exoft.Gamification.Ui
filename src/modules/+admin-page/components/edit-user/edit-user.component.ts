import {Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {environment} from '../../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../../../app/services/user.service';
import {UpdateUser} from '../../../app/models/user/update-user';
import {takeUntil} from 'rxjs/operators';
import {User} from 'src/modules/app/models/user/user';
import { Validators } from '@angular/forms';
import { ReadUser } from 'src/modules/app/models/user/read-user';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject();
  public editUserForm: FormGroup<UpdateUser> = this.formBuilder.group<UpdateUser>({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    roles: [[]],
    status: [''],
    avatar: null
  });
  public avatarUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialog: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
  }

  ngOnInit() {
    this.initializeForm();    
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.editUserForm.controls.avatar.setValue(event.target.files[0]);
      this.editUserForm.controls.avatar.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = () => {
        this.avatarUrl = fileReader.result.toString();
      };
    }
  }

  public onSaveChanges() {
    if (this.editUserForm.valid) {
      this.userService.updateUserInfoById(this.data, this.editUserForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.dialog.close(res as ReadUser);
        });
    }
  }

  public initializeForm() {
    this.userService.getUserInfoById(this.data).subscribe(
      user => {
        this.editUserForm.patchValue(user);
        this.avatarUrl = `${environment.apiUrl}/api/files/${user.avatarId}`;
      });    
  }
}
