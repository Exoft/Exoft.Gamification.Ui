import {Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormGroup, FormBuilder} from 'ngx-strongly-typed-forms';
import {Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {UserService} from 'src/modules/app/services/user.service';
import {passwordContainValidity, passwordEqualityValidator} from '../../functions/add-user-validators';
import {takeUntil} from 'rxjs/operators';
import {PostUser} from 'src/modules/app/models/user/post-user';

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
  public addUserFormGroup: FormGroup<PostUser>

  constructor(
    public dialog: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder) {
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
      this.addUserFormGroup.controls.avatar.setValue(event.target.files[0]);
      this.addUserFormGroup.controls.avatar.updateValueAndValidity(); 

      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = () => {
        this.avatarUrl = fileReader.result.toString();
      };
    }
  }

  public onSaveChanges() {
    if (this.addUserFormGroup.valid) {
      this.userService.createUser(this.addUserFormGroup.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(u => {
          this.dialog.close(u);
        });
    }    
  }

  //TODO: Add Functionality For Adding Roles
  // Also add that in html file
  private initializeForm() {
    this.addUserFormGroup = this.formBuilder.group<PostUser>({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roles: ['User'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        passwordContainValidity
      ]],
      confirmPassword: ['', Validators.required],
      status: '',
      avatar: null
    }, { 
      validator: passwordEqualityValidator
    });
  }
}
