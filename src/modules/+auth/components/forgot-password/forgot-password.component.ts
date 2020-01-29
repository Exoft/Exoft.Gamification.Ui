import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {AuthService} from '../../../app/services/auth.service';


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
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  public onResetPassword(): void {
    if (this.forgotPasForm.invalid) {
      return;
    }

    const forgotPasData = {
      email: this.forgotPasForm.value.email,
      resetPasswordPageLink: this.componentUrl
    };

    this.authService.sendForgotPasLink(forgotPasData).subscribe(response => {
        this.openSnackBar('Now check out your email and follow to the link in it.', 'Notification');
        setTimeout(() => {
          this.router.navigate(['/sign-in']);
        }, 3000);
      },
      error => {
        this.openSnackBar('This email doesn\'t exist', 'Notification');
      });
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public onSignInClick(): void {
    this.router.navigate(['/sign-in']);
  }
}
