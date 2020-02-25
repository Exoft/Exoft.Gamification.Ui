import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from 'src/modules/app/services/auth.service';
import {UserService} from 'src/modules/app/services/user.service';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../../app/services/alert.service';

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
    private readonly loadSpinnerService: LoadSpinnerService,
    private readonly alertService: AlertService
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
              avatarId,
              badgesCount
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
              roles,
              badgesCount
            };
            localStorage.setItem('token', res.token);
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('tokenExpiration', res.tokenExpiration);

            if (res.roles.includes('Admin')) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/customer']);
            }
            this.userService.setUserData(this.userData);
          },
          error => this.alertService.error('Login failed. Please check your e-mail address and password and try again.')
        );
    }
  }

  public onForgotPassword(): void {
    this.router.navigate(['/sign-in/forgot-password']);
  }
}
