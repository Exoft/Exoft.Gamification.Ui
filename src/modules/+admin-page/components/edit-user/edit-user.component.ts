import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from 'ngx-strongly-typed-forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserService } from '../../../app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Validators } from '@angular/forms';
import { UpdateUser } from 'src/modules/app/models/user/update-user';

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
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.userService.getUserInfoById(this.data.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.profileSettingsForm.patchValue(res);
      });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSaveChanges(): void {
    debugger;
    if (this.profileSettingsForm.valid) {
      this.userService.updateUserInfoById(this.data.userId, this.profileSettingsForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.dialog.closeAll();
        });
    }
  }

  // public onSelectFile(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(event.target.files[0]);

  //     fileReader.onload = (imageLoading: Event) => {
  //       this.profileSettingsForm.get('avatar').setValue(event.target.files[0]);
  //       this.avatarUrl = fileReader.result.toString();
  //     };
  //   }
  // }

  public initializeForm() {
    this.profileSettingsForm = this.fb.group<UpdateUser>({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ],
      roles: [[]],
      status: ['']
    });
  }
}
