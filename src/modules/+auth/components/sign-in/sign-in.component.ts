import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {AuthService} from 'src/modules/app/services/auth.service';
import {UserService} from 'src/modules/app/services/user.service';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public signInForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  public userData: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private readonly loadSpinnerService: LoadSpinnerService
  ) {
  }

  public onSignIn() {
    if (this.signInForm.valid) {
      this.loadSpinnerService.showSpinner();
      const {userName, password} = this.signInForm.value;
      const formData = {userName, password};
      this.authService.signIn(formData)
        .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
        .subscribe(
          res => {
            const {
              // tslint:disable-next-line:no-shadowed-variable
              userName,
              lastName,
              firstName,
              email,
              xp,
              status,
              id,
              roles,
              avatarId
            } = res;
            this.userData = {
              userName,
              lastName,
              firstName,
              email,
              xp,
              id,
              status,
              avatarId,
              roles
            };
            localStorage.setItem('token', res.token);
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('tokenExpiration', res.tokenExpiration);
            this.router.navigate(['/dashboard']);
            this.userService.setUserData(this.userData);
          },
          error => {
            this.openSnackBar(
              'Sorry but your email or password are incorrect, please try again',
              'Notification'
            );
          }
        );
    }
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

  public onForgotPassword(): void {
    this.router.navigate(['/sign-in/forgot-password']);
  }
}
