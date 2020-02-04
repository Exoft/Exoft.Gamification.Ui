import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../app/services/auth.service';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../../app/services/alert.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  private componentUrl = 'https://game.exoft.net/sign-in/change-password';

  public forgotPasForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private readonly loadSpinnerService: LoadSpinnerService,
              private readonly alertService: AlertService) {
  }

  public onResetPassword(): void {
    if (this.forgotPasForm.invalid) {
      return;
    }

    const forgotPasData = {
      email: this.forgotPasForm.value.email,
      resetPasswordPageLink: this.componentUrl
    };

    this.loadSpinnerService.showSpinner();
    this.authService.sendForgotPasLink(forgotPasData)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(response => {
          this.alertService.success('We have sent you an email to reset your password. Please check your mailbox.');
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 3000);
        },
        error => {
          this.alertService.error('Please check your email address and try again.');
        });
  }


  public onSignInClick(): void {
    this.router.navigate(['/sign-in']);
  }
}
