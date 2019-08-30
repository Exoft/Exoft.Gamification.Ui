import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {UserService} from 'src/modules/app/services/user.service';
import {RequestService} from 'src/modules/app/services/dashboardequest.service';
import {passwordContainValidity, passwordEqualityValidator} from '../../functions/add-user-validators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  public avatarUrl: string;
  public avatarId: string;
  public userData: any;
  public timeStamp = Date.now();

  public editUserForm = this.formBuilder.group({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    role: new FormControl('User'),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      passwordContainValidity
    ]),
    confirmPassword: new FormControl('', Validators.required),
    status: new FormControl(''),
    avatar: new FormControl(''),
  }, {
    validator: passwordEqualityValidator
  });


  constructor(public dialog: MatDialog,
              private userService: UserService,
              private requestService: RequestService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (imageLoading: Event) => {
        this.editUserForm.get('avatar').setValue(event.target.files[0]);
        this.avatarUrl = fileReader.result.toString();
      };
    }
  }

  public onSaveChanges() {
  debugger;
    if (this.editUserForm.valid) {
      this.userService.createUser(this.editUserForm.value).subscribe(u => {

      });
    }
    /*  if (this.editUserForm.valid) {
        const formModel = this.createFormData(this.editUserForm);
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
      }*/
  }

  createFormData(form: FormGroup): FormData {
    const formData = new FormData();

    for (const field of Object.keys(form.controls)) {
      formData.append(field, form.get(field).value);
    }

    return formData;
  }

}
